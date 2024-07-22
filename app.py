from flask import Flask, request, jsonify, render_template
import pandas as pd
import joblib
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Load the pre-trained model
model = joblib.load('cawildfire_random_forest_model.pkl')

# Load the wildfire data to get county names and coordinates
wildfire_data = pd.read_csv('cawildfire_percent75_data.csv')

# Extract unique county names and their coordinates
county_coordinates = wildfire_data[['incident_county', 'incident_latitude', 'incident_longitude']].drop_duplicates()
county_coordinates = county_coordinates.set_index('incident_county').T.to_dict()

# Get unique county names
county_names = county_coordinates.keys()

@app.route('/')
def home():
    return render_template('index.html', counties=county_names)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.form.to_dict()
        
        # Get latitude and longitude from county name
        county = data['incident_county']
        if county in county_coordinates:
            data['incident_latitude'] = county_coordinates[county]['incident_latitude']
            data['incident_longitude'] = county_coordinates[county]['incident_longitude']
        else:
            logging.error(f"Invalid county name: {county}")
            return jsonify({'error': 'Invalid county name'}), 400
        
        # Preprocess the input data
        processed_data = preprocess(data)
        
        # Make a prediction
        prediction = model.predict([processed_data])
        
        # Convert prediction to human-readable label
        prediction_label = decode_prediction(prediction)
        
        return jsonify({'prediction': prediction_label})
    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return jsonify({'error': 'An error occurred. Please try again.'}), 500

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_message = request.json.get('message')
    bot_response = generate_bot_response(user_message)
    return jsonify({'response': bot_response})

def generate_bot_response(user_message):
    responses = {
        "hello": "Hello! How can I help you with the wildfire containment prediction tool?",
        "hi": "Hi there! How can I assist you today?",
        "how do i use this": "You can use this tool by entering the incident details and clicking on 'Predict' to see the containment time.",
        "help": "Sure, I am here to help. Please provide your question.",
        "default": "I'm not sure how to help with that. Please ask something else."
    }
    return responses.get(user_message.lower(), responses["default"])


def preprocess(data):
    data['incident_date_created'] = pd.to_datetime(data['incident_date_created'])
    data['incident_date_extinguished'] = pd.to_datetime(data['incident_date_extinguished'])
    data['containment_time'] = (data['incident_date_extinguished'] - data['incident_date_created']).total_seconds() / 3600
    data['incident_acres_burned'] = float(data['incident_acres_burned'])
    data['county_population'] = float(data['county_population'])
    data['mean_temperature'] = float(data['mean_temperature'])
    data['incident_latitude'] = float(data['incident_latitude'])
    data['incident_longitude'] = float(data['incident_longitude'])

    # Extract additional date features
    data['day_of_year_created'] = data['incident_date_created'].dayofyear
    data['day_of_week_created'] = data['incident_date_created'].dayofweek
    data['month_created'] = data['incident_date_created'].month
    data['year_created'] = data['incident_date_created'].year
    data['day_of_year_extinguished'] = data['incident_date_extinguished'].dayofyear
    data['day_of_week_extinguished'] = data['incident_date_extinguished'].dayofweek
    data['month_extinguished'] = data['incident_date_extinguished'].month
    data['year_extinguished'] = data['incident_date_extinguished'].year

    # Ensure the order of features matches the training
    feature_order = [
        'incident_acres_burned', 'county_population', 'mean_temperature',
        'incident_latitude', 'incident_longitude', 'day_of_year_created',
        'day_of_week_created', 'month_created', 'year_created',
        'day_of_year_extinguished', 'day_of_week_extinguished', 'month_extinguished', 'year_extinguished'
    ]
    processed_data = [data[feature] for feature in feature_order]
    
    return processed_data

def decode_prediction(prediction):
    labels = ['short', 'medium', 'long']
    return labels[int(prediction[0])]

if __name__ == '__main__':
    app.run(debug=True)

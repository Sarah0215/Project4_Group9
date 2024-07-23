from flask import Flask, request, jsonify, render_template
import pandas as pd
import joblib
import logging
import requests

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Load the pre-trained model
model = joblib.load('spark_cawildfire_random_forest_model.pkl')

# Load the wildfire data to get county names and coordinates
wildfire_data = pd.read_csv('spark_cawildfire_percent75_data.csv')

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

        # Add latitude and longitude based on ZIP code
        if 'zipcode' in data:
            zip_code = data['zipcode']
            zip_data = get_lat_lon_from_zip(zip_code)
            if zip_data:
                data['incident_latitude'] = zip_data['lat']
                data['incident_longitude'] = zip_data['lon']
            else:
                logging.error(f"Invalid ZIP code: {zip_code}")
                return jsonify({'error': 'Invalid ZIP code'}), 400

        # Preprocess the input data
        processed_data = preprocess(data)
        
        # Make a prediction
        prediction = model.predict([processed_data])
        
        # Convert prediction to human-readable label
        prediction_label = decode_prediction(prediction)
        
        return jsonify({'prediction': prediction_label, 'latitude': data['incident_latitude'], 'longitude': data['incident_longitude']})
    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return jsonify({'error': 'An error occurred. Please try again.'}), 500

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_message = request.json.get('message')
    bot_response = generate_bot_response(user_message)
    return jsonify({'response': bot_response})

@app.route('/fire-data')
def fire_data():
    response = requests.get('https://api.nasa.gov/endpoint?params')  # Replace with the actual API URL
    data = response.json()
    return jsonify(data)

def get_lat_lon_from_zip(zip_code):
    # Replace with actual geocoding API
    response = requests.get(f'http://api.zippopotam.us/us/{zip_code}')
    if response.status_code == 200:
        data = response.json()
        return {'lat': float(data['places'][0]['latitude']), 'lon': float(data['places'][0]['longitude'])}
    return None

def generate_bot_response(user_message):
    responses = {
        "hello": "Hello! How can I help you with the wildfire containment prediction tool?",
        "hi": "Hi there! How can I assist you today?",
        "how do i use this": "You can use this tool by entering the incident details and clicking on 'Predict' to see the containment time.",
        "help": "Sure, I am here to help. Please provide your question.",
        "what is wildfire": "A wildfire is an unplanned fire that burns in a natural area such as a forest, grassland, or prairie.",
        "what causes wildfires": "Wildfires can be caused by natural factors like lightning or human activities such as campfires, discarded cigarettes, and arson.",
        "how can i prevent wildfires": "To prevent wildfires, never leave a campfire unattended, avoid burning debris on windy days, and follow local fire regulations.",
        "what should i do if i see a wildfire": "If you see a wildfire, call 911 immediately. Provide the location and any details you can observe.",
        "how do i report a wildfire": "You can report a wildfire by calling 911 or your local fire department.",
        "what is containment time": "Containment time refers to the time it takes to control a wildfire to the point where it no longer spreads.",
        "what factors affect containment time": "Factors affecting containment time include weather conditions, terrain, fuel type, and available firefighting resources.",
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

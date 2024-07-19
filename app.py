from flask import Flask, request, jsonify, render_template

# Initialize the Flask application
app = Flask(__name__)

# Route for the home page
@app.route('/')
def home():
    # Render the index.html template
    return render_template('index.html')

# Route for prediction, accepts POST requests
@app.route('/predict', methods=['POST'])
def predict():
    # Extract data from the form submission
    data = request.form.to_dict()
    # Preprocess the input data (currently mocked)
    processed_data = preprocess(data)
    # Make a prediction (currently mocked)
    prediction = "This will be the prediction result"
    # Return the prediction result as JSON
    return jsonify({'prediction': prediction})

def preprocess(data):
    '''
    Preprocess the input data.
    Converts date to datetime, extracts features, etc.
    '''
    # Convert 'Alarm Date' to datetime format
    data['Alarm Date'] = pd.to_datetime(data['Alarm Date'])
    # Extract the year from the 'Alarm Date'
    data['Year'] = data['Alarm Date'].dt.year
    # Add more preprocessing steps as needed
    return data

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

# Project4_Group9


## Overview
The goal of this project is to develop a machine learning model to predict the containment time of wildfires in California. Accurate predictions of containment times can help improve response times and allocate resources more effectively, ultimately reducing the impact of wildfires. This project utilizes data from various sources including wildfire incidents, county population statistics, and temperature records.

## Data Preprocessing

### Key Preprocessing Steps

- Merging Datasets: Combined population, wildfire, and temperature data based on relevant keys.
   - Files Used:
      - `california_population_by_county.csv`
      - `map_data_final.csv`
      - `temperature_map_data.csv`
- Date Conversion: Converted incident start and end dates to datetime format and calculated the containment time in hours.
- Feature Engineering: Extracted additional temporal features such as day of year, month, and year from the incident dates.
- Handling Missing Values: Dropped rows with missing values in critical columns to ensure data integrity.

## Model Training
The Random Forest Classifier was chosen for this project due to its robustness and ability to handle complex datasets with multiple features. The model was trained to classify the containment time into three categories: short (less than 24 hours), medium (24 to 72 hours), and long (more than 72 hours).

### Key Features Used

- Acres burned
- County population
- Mean temperature
- Incident latitude and longitude
- Day of year, month, and year of incident creation and extinguishment

## Model Evaluation
The model was evaluated using various metrics including precision, recall, and F1-score. Cross-validation was also performed to ensure the reliability of the model's performance.

### Performance Metrics
- Overall Accuracy: 75%
- Cross-validated Accuracy: 76% ± 2%

### Detailed Results
- Short Containment Time: Precision = 0.61, Recall = 0.61, F1-score = 0.61
- Medium Containment Time: Precision = 0.41, Recall = 0.38, F1-score = 0.39
- Long Containment Time: Precision = 0.87, Recall = 0.89, F1-score = 0.88

## Insights and Improvements
The model performs well for predicting long containment times but shows room for improvement in predicting short and medium containment times. This discrepancy could be due to class imbalance or overlapping feature distributions between classes.

## Conclusion
The project successfully meets the requirement of achieving at least 75% classification accuracy and utilizes data retrieved via Spark. The model provides valuable insights into wildfire containment times, which can aid in better preparedness and resource allocation. Future improvements can further enhance the model's accuracy and reliability, making it an even more powerful tool for wildfire management.

## Ethical Considerations
We strive for fairness by using representative data and evaluating the model to detect and mitigate biases. Transparency is maintained by making predictions interpretable and providing thorough documentation of the model development process. We ensure that the model runs efficiently to minimize resource usage, promoting sustainability. These measures ensure that the model remains accurate and responsible.

## Instruction
1. Run the application: python app.py
2. Visit the application at: http://localhost:5000
3. Change input values and click "Predict" to get the containment time prediction.

## Webpage and Chatbot

![image](https://github.com/user-attachments/assets/5a63d28a-89a1-4bf7-971b-687ab4802fbc)

### Webpage Overview
The "California Wildfire Containment Prediction" webpage is designed to help users predict the containment time of wildfires based on various input parameters. This tool leverages a machine learning model trained on historical wildfire data, including incident details, county population statistics, and temperature data.

### How to Use the Webpage
1. Incident Date Created: Enter the date when the wildfire started.
2. Incident Date Extinguished: Enter the date when the wildfire was extinguished.
3. Acres Burned: Input the total number of acres burned by the wildfire.
4. County Population: Provide the population of the county where the wildfire occurred.
5. Mean Temperature: Enter the average temperature during the incident.
6. County: Select the county where the wildfire took place from the dropdown menu.

Once all the fields are filled out, click the "Predict" button to generate a prediction for the wildfire containment time. The prediction will categorize the containment time into one of three classes:

- Short: Containment within 24 hours.
- Medium: Containment between 24 and 72 hours.
- Long: Containment taking more than 72 hours.

### Chatbot Functionality
The webpage includes an interactive chatbot designed to assist users with their inquiries related to the wildfire containment prediction tool. The chatbot can respond to common questions and provide guidance on using the tool effectively.

#### How to Use the Chatbot
- "hello": The chatbot will greet the user and offer assistance.
   - Response: "Hello! How can I help you with the wildfire containment prediction tool?"

- "hi": Another greeting option.
   - Response: "Hi there! How can I assist you today?"

- "how do i use this": Guidance on using the prediction tool.
   - Response: "You can use this tool by entering the incident details and clicking on 'Predict' to see the containment time."

- "help": General help request.
   - Response: "Sure, I am here to help. Please provide your question."

- Default: For unrecognized inputs.
   - Response: "I'm not sure how to help with that. Please ask something else."

#### Implementation Details
The chatbot functionality is implemented using Flask. A POST request is sent to the `/chatbot` endpoint with the user's message, and the server responds with an appropriate message.

![image](https://github.com/user-attachments/assets/70782763-08a3-4933-beda-af6eebf81ba3)

This basic rule-based chatbot serves to enhance user experience by providing instant support and guidance, making the wildfire containment prediction tool more user-friendly and accessible.

## Visualization 

## References

- Data Sources:

   - [wildfire dataset](https://www.fire.ca.gov/incidents)
 
   - [census api](https://www.census.gov/) - Used to add county population in the dataset.

   - [weather api](https://open-meteo.com/) - Used to add mean temperature in the dataset.

- Code References:
  
  - [pandas Documentation](https://pandas.pydata.org/docs/) — Used for data manipulation, cleaning, and saving it to a CSV file.
  - [scikit-learn Documentation](https://scikit-learn.org/stable/user_guide.html) — Used for implementing machine learning models, metrics, and preprocessing techniques.
  - [Google](https://www.google.com/) — Used as a search tool to find relevant references and troubleshoot coding issues.
  - [BCS](https://idp.bootcampspot.com/ui/?requestId=13a338c2-c7bd-4162-ba4c-55c8384afbd5) — Watching cloud recordings, using instructor activity solutions, class activities, and past challenges as references.
  - [ChatGPT](https://www.openai.com/chatgpt) — Used for code assistance and guidance.
   
> #### Contributors: [Alyssa Chand](https://github.com/AlyssaChand), [Aram Keledjian](https://github.com/production23), [Arman Bains](https://github.com/bainsA), [Divya Jindal](https://github.com/divya-jindal), [Palash Raval](https://github.com/palraval) and [Sakurako Kikuchi](https://github.com/Sarah0215) 

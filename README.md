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

The wildfire containment prediction model faces several flaws: class imbalance biases predictions towards long containment times, and the feature set is limited, missing factors like vegetation type and resource availability. The model's complexity could be improved with advanced techniques like gradient boosting. Data quality, especially for weather and air quality, is crucial, as inaccuracies affect predictions. The model also lacks transparency in its decision-making process. Addressing these issues through balanced class weights, expanded features, high-quality data, and methods for transparency like SHAP can enhance its accuracy and reliability.

## Conclusion
The project successfully meets the requirement of achieving at least 75% classification accuracy and utilizes data retrieved via Spark. The model provides valuable insights into wildfire containment times, which can aid in better preparedness and resource allocation. Future improvements can further enhance the model's accuracy and reliability, making it an even more powerful tool for wildfire management.

## Ethical Considerations
We strive for fairness by using representative data and evaluating the model to detect and mitigate biases. Transparency is maintained by making predictions interpretable and providing thorough documentation of the model development process. We ensure that the model runs efficiently to minimize resource usage, promoting sustainability. These measures ensure that the model remains accurate and responsible.

## Instruction
1. Run the application: python app.py
2. Visit the application at: http://localhost:5000
3. Change input values and click "Predict" to get the containment time prediction.

## Webpage and Chatbot

![image](https://github.com/user-attachments/assets/72112bf6-0e7e-4143-ab93-48daddebec35)

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

- "what is wildfire": Definition of wildfire.
   - Response: "A wildfire is an unplanned fire that burns in a natural area such as a forest, grassland, or prairie."

- Default: For unrecognized inputs.
   - Response: "I'm not sure how to help with that. Please ask something else."

#### Implementation Details
The chatbot functionality is implemented using Flask. A POST request is sent to the `/chatbot` endpoint with the user's message, and the server responds with an appropriate message.

![image](https://github.com/user-attachments/assets/d721f0da-159b-4c24-a00f-534bae05186f)

![image](https://github.com/user-attachments/assets/fb641dd9-d4a2-4940-aa2d-937cd8edaf5d)

This basic rule-based chatbot serves to enhance user experience by providing instant support and guidance, making the wildfire containment prediction tool more user-friendly and accessible.

## Exploratory Data Analysis (EDA) for Model Features

### Histograms and Bar Chart

![Screenshot 2024-07-22 194309](https://github.com/user-attachments/assets/0fbc6660-c9f5-4533-955d-973ce0e52bc6)

![image](https://github.com/user-attachments/assets/279908bd-2323-4e1f-ad49-42ffe66b7e08)

![Screenshot 2024-07-22 201010](https://github.com/user-attachments/assets/545407c2-ce75-480f-91e6-060b4b06e545)


1. #### Incident Acres Burned:
   - The majority of wildfires have burned relatively small areas, with a significant concentration below 50,000 acres, although there are some extreme outliers.
2. #### County Population:
   - The population distribution of affected counties is skewed towards lower values, suggesting that wildfires predominantly occur in less densely populated regions.
3. #### Mean Temperature:
   - The mean temperature data follows a normal distribution centered around 20 degrees Celsius. This suggests that most wildfires occur in areas with moderate temperatures.
4. #### Incident Latitude and Longitude:
   - The geographical distribution of wildfires shows clustering in specific latitudinal and longitudinal bands, hinting at regional susceptibility.
5. #### Day of Year Created and Extinguished:
   - Temporal analysis reveals that wildfires are more frequent during mid-year and late-year periods, aligning with seasonal weather patterns.
6. #### Day of Week Created and Extinguished:
   - The day of the week appears to have little impact on wildfire occurrence or containment.
7. #### Month Created and Extinguished:
   - The monthly data highlights peaks during summer and early autumn, consistent with California's wildfire season.
8. #### Year Created and Extinguished:
   - An increasing trend in wildfire incidents over recent years underscores the urgency for improved fire management strategies.
9. #### Containment Time Class:
   -  The distribution of containment time classes shows that the majority of wildfires fall into the 'long' category, taking more than 72 hours to contain. This highlights the challenges in managing large wildfires, underscoring the importance of resource allocation          and effective response strategies to handle such prolonged incidents.
  
These findings emphasize the need for targeted preventive measures and resource allocation to mitigate wildfire impact effectively. Further analyses, such as correlation studies, time series forecasting, and geospatial mapping, could provide deeper insights into wildfire behavior and aid in developing robust predictive models.

### Boxplots

![Screenshot 2024-07-22 202232](https://github.com/user-attachments/assets/0f2d85b5-6a72-42aa-a2d3-2844cc3d2e12)

![Screenshot 2024-07-22 202254](https://github.com/user-attachments/assets/31f43eed-e9cf-4229-b63b-125f3a81d55f)

![Screenshot 2024-07-22 202318](https://github.com/user-attachments/assets/bd2e4f06-ab94-4be4-82e4-af8601506272)

![Screenshot 2024-07-22 202337](https://github.com/user-attachments/assets/53af167b-c042-4d34-bf67-f3fbf93efe2c)

1. #### Incident Acres Burned:
   - There are a significant number of outliers, indicating that while most wildfires burn relatively fewer acres, some wildfires have extreme values in terms of acres burned.
2. #### County Population:
   - The county population values show a right-skewed distribution with a few counties having a very high population, making them outliers.
3. #### Mean Temperature:
   - The mean temperature shows a normal distribution, which indicates a balanced spread around the central value. There are some outliers on both ends of the temperature range.
4. #### Incident Latitude and Longitude:
   - The values for latitude and longitude are quite concentrated with some extreme outliers. This suggests that most wildfires occur in a specific geographic range, but there are exceptions.
5. #### Day of Year Created and Extinguished:
   - The data shows a wide distribution, indicating that wildfires can occur at any time of the year. There are several outliers, particularly for the days near the beginning and end of the year, possibly due to seasonal variations and environmental conditions.
6. #### Day of Week Created and Extinguished:
   - Wildfires seem to occur uniformly across the days of the week with no significant outliers, suggesting a consistent pattern without any particular day standing out.
7. #### Month Created and Extinguished:
   - The data shows that wildfires are more common during certain months, typically in the summer. Some outliers exist, which might represent unusual events where wildfires occurred outside the typical wildfire season.
8. #### Year Created and Extinguished:
   - The data shows an increasing trend of wildfires in recent years, with some outliers in the earlier years.
9. #### Containment Time:
   - The containment time shows extreme outliers, indicating that while most containment times are short, a few incidents have taken significantly longer to contain. This could be due to the severity and scale of certain wildfires, requiring more extended efforts for       containment.

Overall, the data visualizations highlight the presence of outliers in several features, indicating that while the majority of wildfires follow a certain trend, there are significant exceptions that deviate from the norm. This information is crucial for understanding the variability in wildfire data and can help in improving the predictive model's accuracy.

## References

- Data Sources:

   - [CAL FIRE](https://www.fire.ca.gov/incidents) - Data used for this project.
 
   - [U.S. Census Bureau](https://www.census.gov/) - Used to add county population in the dataset.

   - [Open-Meteo](https://open-meteo.com/) - Used to add mean temperature in the dataset.

- Code References:
  
  - [pandas Documentation](https://pandas.pydata.org/docs/) — Used for data manipulation, cleaning, and saving it to a CSV file.
  - [scikit-learn Documentation](https://scikit-learn.org/stable/user_guide.html) — Used for implementing machine learning models, metrics, and preprocessing techniques.
  - [Google](https://www.google.com/) — Used as a search tool to find relevant references and troubleshoot coding issues.
  - [BCS](https://idp.bootcampspot.com/ui/?requestId=13a338c2-c7bd-4162-ba4c-55c8384afbd5) — Watching cloud recordings, using instructor activity solutions, class activities, and past challenges as references.
  - [ChatGPT](https://www.openai.com/chatgpt) — Used for code assistance and guidance.
   
> #### Contributors: [Alyssa Chand](https://github.com/AlyssaChand), [Aram Keledjian](https://github.com/production23), [Arman Bains](https://github.com/bainsA), [Divya Jindal](https://github.com/divya-jindal), [Palash Raval](https://github.com/palraval) and [Sakurako Kikuchi](https://github.com/Sarah0215) 

# Project4_Group9


## Overview
The goal of this project is to develop a machine learning model to predict the containment time of wildfires in California. Accurate predictions of containment times can help improve response times and allocate resources more effectively, ultimately reducing the impact of wildfires. This project utilizes data from various sources including wildfire incidents, county population statistics, and temperature records.

## Data Preprocessing

### Data Sources
 - https://catalog.data.gov/dataset/california-fire-perimeters-all-b3436  
Fire Perimeter Dataset: This dataset includes information about the perimeter of fires, including attributes like the year, state, agency, fire name, alarm date, containment date, cause, and GIS-calculated acres.(22000 Data rows)
 - https://catalog.data.gov/dataset/california-fire-hazard-severity-zone-viewer-8abb4  
Incident Dataset: This dataset contains details about fire incidents, including incident name, date created, administrative unit, location, acres burned, containment status, latitude, longitude, and more.

### Key Preprocessing Steps

- Merging Datasets: Combined population, wildfire, and temperature data based on relevant keys.
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

## Instruction
1. $ python app.py
2. visit app at:5000
3. Change input values and click submit. 

## Visualization 


## Contributors
Alyssa Chand - [Alyssa Chand](https://github.com/AlyssaChand) 
Aram Keledjian - [Aram Keledjian](https://github.com/production23) 
Arman Bains -  [Arman Bains](https://github.com/bainsA) 
Divya Jindal - [Divya Jindal](https://github.com/divya-jindal)  
Palash Raval - [Palash Raval](https://github.com/palraval) 
Sakurako Kikuchi - [Sakurako Kikuchi](https://github.com/Sarah0215) 

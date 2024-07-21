document.getElementById('toggle-dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// Handle form submission and display prediction result
document.getElementById('prediction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const spinner = document.getElementById('loading-spinner');
    const predictionResult = document.getElementById('prediction-result');
    
    // Show the spinner
    spinner.style.display = 'block';
    predictionResult.innerText = '';

    fetch('/predict', {
        method: 'POST',
        body: new URLSearchParams(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Hide the spinner
        spinner.style.display = 'none';
        
        // Create an explanation text based on the prediction
        let explanation;
        if (data.prediction === 'short') {
            explanation = "Short: Containment within 24 hours.";
        } else if (data.prediction === 'medium') {
            explanation = "Medium: Containment between 24 to 72 hours.";
        } else if (data.prediction === 'long') {
            explanation = "Long: Containment taking more than 72 hours.";
        }
        
        // Display the prediction and explanation
        predictionResult.innerHTML = `Prediction: ${data.prediction} <br> ${explanation}`;
    })
    .catch(error => {
        // Hide the spinner
        spinner.style.display = 'none';
        console.error('Error:', error);
        predictionResult.innerText = 'An error occurred. Please try again.';
    });
});

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
        predictionResult.innerText = `Prediction: ${data.prediction}`;
    })
    .catch(error => {
        // Hide the spinner
        spinner.style.display = 'none';
        console.error('Error:', error);
    });
});

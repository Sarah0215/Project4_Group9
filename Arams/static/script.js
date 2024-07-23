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
        
        // Get the latitude and longitude from the prediction response
        const latitude = data.latitude;
        const longitude = data.longitude;
        const acresBurned = parseFloat(formData.get('incident_acres_burned'));

        // Clear previous circles
        clearMap();

        // Draw circles on the map based on the acres burned
        drawCircles(latitude, longitude, acresBurned);
    })
    .catch(error => {
        // Hide the spinner
        spinner.style.display = 'none';
        console.error('Error:', error);
        predictionResult.innerText = 'An error occurred. Please try again.';
    });
});

// Fetch real-time fire data
function fetchFireData() {
    fetch('/fire-data')
        .then(response => response.json())
        .then(data => {
            displayFireDataList(data);
        })
        .catch(error => console.error('Error fetching fire data:', error));
}

// Display fire data on the list
function displayFireDataList(data) {
    const fireList = document.getElementById('fire-list');
    fireList.innerHTML = '';
    data.forEach(fire => {
        const fireItem = document.createElement('div');
        fireItem.className = 'fire-item';
        fireItem.innerHTML = `<b>${fire.name}</b> (${fire.status})`;
        fireItem.addEventListener('click', () => {
            displayFireOnMap(fire);
            fetchPrediction(fire);
        });
        fireList.appendChild(fireItem);
    });
}

// Display fire on the map
function displayFireOnMap(fire) {
    const marker = L.marker([fire.latitude, fire.longitude]).addTo(map);
    marker.bindPopup(`<b>Fire Name:</b> ${fire.name}<br><b>Status:</b> ${fire.status}`).openPopup();
}

// Clear previous circles from the map
function clearMap() {
    map.eachLayer((layer) => {
        if (layer instanceof L.Circle) {
            map.removeLayer(layer);
        }
    });
}

// Draw circles on the map based on the acres burned
function drawCircles(latitude, longitude, acresBurned) {
    const radius = Math.sqrt(acresBurned) * 100;  // Adjust radius based on acres burned
    L.circle([latitude, longitude], {
        color: 'none',  // Remove the stroke
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: radius
    }).addTo(map);
}

// Fetch prediction based on fire data
function fetchPrediction(fire) {
    const formData = new URLSearchParams({
        incident_date_created: fire.dateCreated,
        incident_date_extinguished: fire.dateExtinguished,
        incident_acres_burned: fire.acresBurned,
        county_population: fire.countyPopulation,
        mean_temperature: fire.meanTemperature,
        zipcode: fire.zipcode,
        incident_county: fire.county
    });

    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        let explanation;
        if (data.prediction === 'short') {
            explanation = "Short: Containment within 24 hours.";
        } else if (data.prediction === 'medium') {
            explanation = "Medium: Containment between 24 to 72 hours.";
        } else if (data.prediction === 'long') {
            explanation = "Long: Containment taking more than 72 hours.";
        }
        document.getElementById('prediction-result').innerHTML = `Prediction: ${data.prediction} <br> ${explanation}`;

        // Clear previous circles
        clearMap();

        // Draw circles on the map based on the acres burned
        drawCircles(data.latitude, data.longitude, fire.acresBurned);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('prediction-result').innerText = 'An error occurred. Please try again.';
    });
}

// Call the function to fetch and display fire data
fetchFireData();

// Chatbot handling
document.addEventListener('DOMContentLoaded', function () {
    const openChatbotBtn = document.getElementById('open-chatbot');
    const closeChatbotBtn = document.querySelector('.close-chatbot');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatLogs = document.getElementById('chatlogs');
    const suggestions = document.getElementById('suggestions');

    const questions = [
        "hello",
        "hi",
        "how do i use this",
        "help",
        "what is wildfire",
        "what causes wildfires",
        "how can i prevent wildfires",
        "what should i do if i see a wildfire",
        "how do i report a wildfire",
        "what is containment time",
        "what factors affect containment time"
    ];

    openChatbotBtn.addEventListener('click', function () {
        chatbotContainer.style.display = 'block';
    });

    closeChatbotBtn.addEventListener('click', function () {
        chatbotContainer.style.display = 'none';
    });

    sendBtn.addEventListener('click', function () {
        const message = chatInput.value.trim();
        if (message) {
            appendChatMessage('User', message);
            chatInput.value = '';
            fetchResponse(message);
            suggestions.innerHTML = '';  // Clear suggestions after sending a message
        }
    });

    chatInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                appendChatMessage('User', message);
                chatInput.value = '';
                fetchResponse(message);
                suggestions.innerHTML = '';  // Clear suggestions after sending a message
            }
        }
    });

    chatInput.addEventListener('input', function () {
        const input = chatInput.value.toLowerCase();
        suggestions.innerHTML = '';
        if (input) {
            const filteredQuestions = questions.filter(question => question.startsWith(input));
            filteredQuestions.forEach(question => {
                const suggestion = document.createElement('div');
                suggestion.className = 'suggestion';
                suggestion.textContent = question;
                suggestion.addEventListener('click', function () {
                    chatInput.value = question;
                    suggestions.innerHTML = '';  // Clear suggestions when a suggestion is clicked
                });
                suggestions.appendChild(suggestion);
            });
        }
    });

    function fetchResponse(message) {
        const lowerCaseMessage = message.toLowerCase().replace(/[?!.]$/, ''); // Remove trailing punctuation
        fetch('/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: lowerCaseMessage })
        })
        .then(response => response.json())
        .then(data => {
            if (data.response) {
                appendChatMessage('Bot', data.response);
            } else {
                appendChatMessage('Bot', 'An error occurred. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            appendChatMessage('Bot', 'An error occurred. Please try again.');
        });
    }

    function appendChatMessage(sender, message) {
        const chatMessage = document.createElement('div');
        chatMessage.className = sender === 'User' ? 'user-message' : 'bot-message';
        chatMessage.textContent = message;
        chatLogs.appendChild(chatMessage);
        chatLogs.scrollTop = chatLogs.scrollHeight;
    }
});

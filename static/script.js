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


// Chatbot handling
document.addEventListener('DOMContentLoaded', function () {
    const openChatbotBtn = document.getElementById('open-chatbot');
    const closeChatbotBtn = document.querySelector('.close-chatbot');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatLogs = document.getElementById('chatlogs');

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
        }
    });

    chatInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                appendChatMessage('User', message);
                chatInput.value = '';
                fetchResponse(message);
            }
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









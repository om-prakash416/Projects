document.getElementById('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const inputField = document.getElementById('input');
    const userMessage = inputField.value.trim();
    if (userMessage === '') return;

    appendMessage(userMessage, 'user');
    inputField.value = '';

    getBotResponse(userMessage);
}

function appendMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(userMessage) {
    let botMessage = 'I am not sure how to respond to that.';

    if (userMessage.toLowerCase().includes('hello')) {
        botMessage = 'Hello! How can I help you today?';
    } else if (userMessage.toLowerCase().includes('how are you')) {
        botMessage = 'I am just a bot, but I am functioning as expected!';
    } else if (userMessage.toLowerCase().includes('bye')) {
        botMessage = 'Goodbye! Have a great day!';
    }

    setTimeout(() => {
        appendMessage(botMessage, 'bot');
        speak(botMessage);
    }, 500);
}

function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
        const userMessage = event.results[0][0].transcript;
        appendMessage(userMessage, 'user');
        get
        BotResponse(userMessage);
    };

    recognition.onspeechend = () => {
        recognition.stop();
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
    };
}

function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
}

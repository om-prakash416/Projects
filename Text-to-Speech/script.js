// Check if the browser supports speech synthesis
if ('speechSynthesis' in window) {
    const speakButton = document.getElementById('speak-btn');
    const textToRead = document.getElementById('text-to-read');

    // Function to speak the entered text
    const speakText = () => {
        const text = textToRead.value.trim();
        if (text !== '') {
            const speech = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(speech);
        } else {
            alert('Please enter some text to be read.');
        }
    };

    // Event listener for the Speak button
    speakButton.addEventListener('click', speakText);
} else {
    // Display a message if speech synthesis is not supported
    alert('Sorry, your browser does not support speech synthesis.');
}

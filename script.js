// Toggle Chat Window
function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    if (chatWidget.style.display === "flex") {
        chatWidget.style.display = "none";
    } else {
        chatWidget.style.display = "flex";
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') processUserMessage();
}

function sendQuickReply(text) {
    document.getElementById('userInput').value = text;
    processUserMessage();
}

function processUserMessage() {
    const inputField = document.getElementById('userInput');
    const message = inputField.value.trim();

    if (message === "") return;

    // Show user message
    addMessageToChat(message, 'user-message');
    inputField.value = "";

    setTimeout(() => {
        generateBotResponse(message.toLowerCase());
    }, 600);
}

// THE IF-ELSE LOGIC WITH .includes()
function generateBotResponse(msg) {
    let response = "";

    if (msg.includes("hello") || msg.includes("hi")) {
        response = "Hello! I can help you find our menu, opening hours, or contact info.";
    } 
    // NAVIGABILITY USE CASE
    else if (msg.includes("menu") || msg.includes("food") || msg.includes("dishes")) {
        response = "Right away! Scrolling down to our menu section now. ";
        // This is the navigation requirement! It scrolls the actual website.
        document.getElementById('restaurant-menu').scrollIntoView({ behavior: 'smooth' });
    } 
    // NAVIGABILITY USE CASE 2
    else if (msg.includes("contact") || msg.includes("location") || msg.includes("where")) {
        response = "Taking you to our contact details now. ";
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
    else if (msg.includes("time") || msg.includes("hours") || msg.includes("open")) {
        response = "We are open Monday to Sunday from 10:00 AM to 11:00 PM. ";
    } 
    else {
        response = "I'm still learning! Please try some different words and sentence framming.";
    }

    addMessageToChat(response, 'bot-message');
}

function addMessageToChat(text, className) {
    const chatBox = document.getElementById('chatBox');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text;
    
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
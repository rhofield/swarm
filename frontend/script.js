const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessagesDiv = document.getElementById('chat-messages');
const spinner = document.getElementById('spinner');

if (!messageInput || !sendButton || !chatMessagesDiv || !spinner) {
    throw new Error("Essential DOM elements not found. Check your HTML structure.");
}

const BASE_URL = 'http://127.0.0.1:8000';
let conversationHistory = [];

function addMessage(text, sender, agentName) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    if (sender === 'user') {
        messageDiv.classList.add('user-message');
        messageDiv.innerHTML = marked.parse(text);
    } else {
        messageDiv.classList.add('api-message');
        if (agentName) {
            messageDiv.innerHTML = marked.parse(`**${agentName}:** ${text}`);
        } else {
            messageDiv.innerHTML = marked.parse(text);
        }
    }

    chatMessagesDiv.appendChild(messageDiv);
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;

    // Add message to history
    const role = sender === 'user' ? 'user' : 'assistant';
    conversationHistory.push({ role: role, content: text });
}

async function sendMessageToApi(message) {
    addMessage(message, 'user');
    messageInput.value = '';
    sendButton.disabled = true;
    spinner.style.display = 'block';
    try {
        const response = await fetch(`${BASE_URL}/api/send_message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                history: conversationHistory
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const agentName = data.agent || 'No agent received.';
        addMessage(data.response, 'agent', agentName);

    } catch (error) {
        console.error('Error sending message to API:', error);
        addMessage(`Error: ${error.message}`, 'agent');
    } finally {
        sendButton.disabled = false;
        spinner.style.display = 'none';
        messageInput.focus();
    }
}


sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        sendMessageToApi(message);
    }
});

messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

messageInput.focus(); 
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const userMessagesDiv = document.getElementById('user-messages');
const apiMessagesDiv = document.getElementById('api-messages');
const spinner = document.getElementById('spinner');

const BASE_URL = 'http://127.0.0.1:8000';
let conversationHistory = [];

function addMessage(text, sender, agentName) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = marked.parse(text);

    if (sender === 'user') {
        messageDiv.classList.add('user-message');
        userMessagesDiv.appendChild(messageDiv);
        userMessagesDiv.scrollTop = userMessagesDiv.scrollHeight;
    } else {
        messageDiv.classList.add('api-message');
        const agentNameSpan = document.querySelector('#api-messages .agent-name');
        if (agentNameSpan && agentName) {
            agentNameSpan.textContent = agentName + ': ';
        }
        apiMessagesDiv.appendChild(messageDiv);
        apiMessagesDiv.scrollTop = apiMessagesDiv.scrollHeight;
    }

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

        console.log('response');
        console.log(response);

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
    // Send message on Enter key press
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

// Example function to get CSRF token from cookies (if needed for Django)
/*
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
*/

// Initial focus on the input field
messageInput.focus(); 
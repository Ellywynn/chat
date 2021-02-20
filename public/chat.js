const socket = io();

const members = document.querySelector('.members');
const chat = document.querySelector('.chat-history');
const input = document.querySelector('#chat-input');
const form = document.querySelector('#chat-form');

const { username } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

let userID = null;

socket.emit('userJoined', username);
userJoinedMessage('You');
addCurrentUser(username);

socket.on('userAccepted', ID => {
    userID = ID;
})

socket.on('message', (senderName, text) => {
    appendReceivedMessage(senderName, text);
});

socket.on('userJoined', userName => {
    userJoinedMessage(userName);
    addJoinedUser(userName);
});

socket.on('userLeft', userName => {
    userLeftMessage(userName);
    removeLeftUser(userName);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let msg = input.value.trim();

    if (msg) {
        socket.emit('message', msg);
        appendSentMessage(msg);
        input.value = '';
    }
})

function appendSentMessage(text) {
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper-sent';
    const msg = createMessage('You', text);
    msg.classList.add('sent');
    wrapper.appendChild(msg);

    chat.appendChild(wrapper);
    msg.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: 'center'
    });
}

function appendReceivedMessage(sender, text) {
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper-received';
    const msg = createMessage(sender, text);
    msg.classList.add('received');

    wrapper.appendChild(msg);

    chat.appendChild(wrapper);
    chat.appendChild(document.createElement('br'));


    msg.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: 'center'
    });
}

function createMessage(sender, text) {
    const div = document.createElement('div');
    div.classList.add('message');
    const h4 = document.createElement('h4');
    h4.textContent = sender;
    const div_msg = document.createElement('div');
    div_msg.className = 'message-text';
    div_msg.textContent = text;

    div.appendChild(h4);
    div.appendChild(div_msg);

    return div;
}

function userJoinedMessage(userName) {
    let div = document.createElement('div');
    div.className = 'action';
    div.textContent = userName + ' joined';
    chat.appendChild(div);
}

function userLeftMessage(userName) {
    let div = document.createElement('div');
    div.className = 'action';
    div.textContent = userName + ' left';
    chat.appendChild(div);
}

function addJoinedUser(userName) {
    let li = document.createElement('li');
    li.textContent = userName;
    li.id = userID;
    members.appendChild(li);
}

function addCurrentUser(userName) {
    let li = document.createElement('li');
    li.textContent = userName + ' (you)';
    li.style = 'color: rgb(250,100,216);';
    members.appendChild(li);
}

function removeLeftUser(userName) {
    for (let i = 0; i < members.children.length; i++) {
        if (members.children[i].id === userID) {
            members.removeChild(members.children[i]);
            return;
        }
    }
}
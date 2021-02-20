const socket = io('http://localhost:3000');

const members = document.querySelector('.members');
const chat = document.querySelector('.chat-history');
const input = document.querySelector('#chat-input');
const form = document.querySelector('#chat-form');

const username = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

appendReceivedMessage('asdfasdf', 'fjreiqjfiewrhguiedafjasdfdnjasdhfrhfuerhfuerhfuerufherhfuerhfuerhufehrufherufheurfheurhfuerhfurghuwerhguwerhgurrwe');
appendReceivedMessage('asdfasdf', 'fjreiqjfiewrhguierghuwerhguwerhgurrwe');
appendReceivedMessage('asdfasdf', 'fjreiqjfiewrhguierghuwerhguwerhgurrwe');
appendReceivedMessage('asdfasdf', 'fjreiqjfiewrhguierghuwerhguwerhgurrwe');

socket.emit('userJoined', username);

socket.on('message', (sendername, text) => {

});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let msg = input.value.trim();

    if (msg) {
        socket.emit('userJoined', username, msg);
        appendSentMessage(msg);
        input.value = '';
    }
})

function appendSentMessage(text) {
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper';
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
    const msg = createMessage(sender, text);
    msg.classList.add('received');;

    chat.appendChild(msg);
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
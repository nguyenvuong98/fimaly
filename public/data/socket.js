
var socket;
const initSocket = () => {
    socket = io.connect(baseURL);
    socket.emit('online', {username: info.username})
    socket.on('recive-message', (data) => {
        let template = ``;
        if (data.username == info.username) {
            template = `
                <div class="clearfix mb-2"> 
                    <div class="my-message float-right">
                        <p class="message">${data.message}</p>
                    </div>
                </div>
                
            `;
        } else {
            template = `
                <div class="clearfix mb-2">
                    <div class="">
                        <p class="title-message"><i>${data.username}</i></p>
                        <div class="another-message">
                            <p class="message">${data.message}</p>
                        </div>
                    <div>
                </div>
            `;
        }

        $('#content-message').append(template);
        $('#content-message').animate({
            scrollTop: $("#content-message").prop("scrollHeight")
        }, 500);
    });

    socket.on('notifi-online', (data) => {
        let template = `<p class="message-notifi"><b><i>${data.name}</b> đã tham gia trò chuyện</i></p>`;
        $('#notification').append(template);
        $('#notification').animate({
            scrollTop: $("#notification").prop("scrollHeight")
        }, 500);
    });

    socket.on('notifi-offline', (data) => {
        let template = `<p class="message-notifi"><b><i>${data.name}</b> đã rời khỏi</i></p>`;
        $('#notification').append(template);
        $('#notification').animate({
            scrollTop: $("#notification").prop("scrollHeight")
        }, 500);
    });

    socket.on('users', (data) => {
        if (data && data.users) {
            let template = '';

            data.users.forEach(item => {
                template += `
                    <div>
                        <div class="status mr-1 ${item.is_online ? 'online' : ''}"></div>
                        <span>${item.name}</span.
                    </div>
                `;
            });
            $('#user').html('');
            $('#user').append(template);
        }
    })
}

const sendMessage = () => {
    let message = $('#input-chat').val();
    if (isLogin && message && message !== '') {
        socket.emit('send-message', {username: info.username, message});
    }
    $('#input-chat').val('');
}
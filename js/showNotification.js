export function showNotification(message, isSuccess) {
    var notification = document.createElement('div');
    notification.className = 'notification';
    if (isSuccess) {
        notification.classList.add('success');
    } else {
        notification.classList.add('error');
    }
    var content = document.createElement('div');
    content.className = 'notification-content';

    var icon = document.createElement('span');
    icon.className = 'notification-icon';
    icon.innerHTML = '&#x1F514;';

    var messageElement = document.createElement('p');
    messageElement.className = 'notification-message';
    messageElement.innerHTML = message;

    var close = document.createElement('span');
    close.className = 'notification-close';
    close.innerHTML = '&times;';

    close.addEventListener('click', function () {
        notification.remove();
    });

    content.appendChild(icon);
    content.appendChild(messageElement);
    content.appendChild(close);
    notification.appendChild(content);

    document.body.appendChild(notification);

    setTimeout(function () {
        notification.classList.add('show');
    }, 100);

    setTimeout(function () {
        notification.remove();
    }, 5000);
}
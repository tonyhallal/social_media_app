const loggedUser = localStorage.getItem('username');
document.getElementById('nav-home').href = `/api/v1/posts/${loggedUser}`;
document.getElementById('nav-messages').href = `/api/v1/connected-users`
document.getElementById('new-post').href = `/api/v1/new-post`
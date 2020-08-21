const scriptURL = 'https://script.google.com/macros/s/AKfycbxJTJIvfkJzTusu8PGkyP1aGmA7KSrKq8H4OiiQYSl9Lf6ZVM8/exec';

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var username = getCookie("username");
  if (username == "") {
    username = prompt("Informe seu nome completo:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
  }
  return username;
}

function progressBut(button_id) {
    var usrname = checkCookie();
    var but = document.getElementById(button_id);
    var text = but.firstChild;
    if (usrname != "") {
        if(text.data == "Cheguei Aqui!"){
            text.data = "Progresso reportado!";
            but.className = "button0 buttonDone";

            f = new FormData();
            f.append('name', usrname);
            f.append('time', new Date());
            f.append('id', button_id);
            f.append('url', window.location.href);
            fetch(scriptURL, { method: 'POST', body: f})
            .then(response => console.log('Success!', response))
            .catch(error => console.error('Error!', error.message));
        }
    } else {
        text.data = "Preencha o nome antes de seguir.";
        but.className = "button1";
        setTimeout(() => { but.className = "button0";
                           text.data = "Cheguei Aqui!";}, 2000);
    }
}

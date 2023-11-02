var failedAttempts = parseInt(sessionStorage.getItem('failedAttempts')) || 0;
var blockTime = parseInt(sessionStorage.getItem('blockTime')) || 0;

function checkCredentials(username, password) {
  const users = [
    { username: 'Seguridad01', password: 'SecuR1ty#2023' },
    { username: 'Seguridad02', password: 'B1gD@t@H4ck3r' },
    { username: 'Seguridad03', password: 'S3cr3tP@sswrd' }
  ];
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  return user !== undefined;
}

function showError(message) {
  alert(message);
}

function blockLogin() {
  blockTime += (failedAttempts + 1) * 5;
  document.getElementById('username').disabled = true;
  document.getElementById('password').disabled = true;
  document.getElementById('login-button').disabled = true;
  setTimeout(() => {
    document.getElementById('username').disabled = false;
    document.getElementById('password').disabled = false;
    document.getElementById('login-button').disabled = false;
    failedAttempts = 0;
    blockTime = 0;
    sessionStorage.setItem('failedAttempts', failedAttempts);
    sessionStorage.setItem('blockTime', blockTime);
  }, blockTime * 2000);
}

function logFailedAttempt(username) {
  const logMessage = `Intento de acceso fallido para el usuario: ${username} - ${new Date()}\n`;

  // Almacenamos los registros en una variable de sesión llamada 'log'
  if (!sessionStorage.getItem('log')) {
    sessionStorage.setItem('log', '');
  }
  
  const currentLog = sessionStorage.getItem('log');
  sessionStorage.setItem('log', currentLog + logMessage);
}

document.getElementById('login-form').addEventListener('submit', (event) => {
  event.preventDefault();
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  if (checkCredentials(username, password)) {
    sessionStorage.setItem('isLoggedIn', 'true');
    window.location.replace('cifrado.html');
  } else {
    failedAttempts++;
    showError('Has ingresado mal los datos, revisalos e intenta de nuevo');
    logFailedAttempt(username); // Registra el intento fallido
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.setItem('failedAttempts', failedAttempts);
    sessionStorage.setItem('blockTime', blockTime);
  }
  if (failedAttempts === 3) {
    showError('Has bloqueado los intentos (3), en 1 minuto podras intentarlo de nuevo');
    blockLogin();
  }
});
if (failedAttempts > 0) {
  document.getElementById('username').disabled = true;
  document.getElementById('password').disabled = true;
  document.getElementById('login-button').disabled = true;
  blockLogin();
}

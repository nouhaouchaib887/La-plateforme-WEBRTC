var ws;
var connectButton = document.getElementById('connectButton');
var sendButton = document.getElementById('sendButton');
var closeButton = document.getElementById('closeButton');
var sendTextArea = document.getElementById('dataChannelSend');
var receiveTextArea = document.getElementById('dataDataChannelReceive');

connectButton.onclick = function() {
    ws = new WebSocket('ws://localhost:8089');
    ws.onopen = function() {
        console.log('Connection opened!');
        connectButton.disabled = true;
        sendButton.disabled = false;
        closeButton.disabled = false;
        sendTextArea.disabled = false;
    };

    ws.onmessage = function(event) {
      if (event.data instanceof Blob) {
          // On reçoit un Blob, nous devons le convertir en texte
          var reader = new FileReader();
          reader.onload = function() {
              console.log('Received data: ' + reader.result);
              receiveTextArea.value = reader.result;
          };
          reader.readAsText(event.data);
      } else {
          // Si ce n'est pas un Blob, nous supposons que c'est déjà du texte
          console.log('Received data: ' + event.data);
          receiveTextArea.value = event.data;
      }
  };
  

    ws.onclose = function() {
        console.log('Connection closed!');
        resetUI();
    };

    ws.onerror = function(error) {
        console.log('WebSocket Error: ', error);
        resetUI();
    };
};

sendButton.onclick = function() {
    var data = sendTextArea.value;
    ws.send(data);
    console.log('Sent data: ' + data);
};

closeButton.onclick = function() {
    ws.close();
};

function resetUI() {
    connectButton.disabled = false;
    sendButton.disabled = true;
    closeButton.disabled = true;
    sendTextArea.disabled = true;
    sendTextArea.value = '';
    receiveTextArea.value = '';
}

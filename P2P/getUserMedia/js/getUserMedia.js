navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

// Définir les contraintes pour l'appel à getUserMedia
var constraints = {
    audio: false, 
    video: {
        width: { ideal: 1280 },  // Largeur idéale de 1280 pixels
        height: { ideal: 720 }   // Hauteur idéale de 720 pixels (HD)
    }
};
var video = document.querySelector('video');
function successCallback(stream) {
    window.stream = stream;  
    video.srcObject = stream;  
    video.play();
}

function errorCallback(error) {
    console.error('navigator.getUserMedia error:', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);

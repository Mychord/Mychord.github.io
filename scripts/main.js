let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/img1.png') {
      myImage.setAttribute('src', 'images/img2.jpg');
    } else {
      myImage.setAttribute('src', 'images/img1.png');
    }
}
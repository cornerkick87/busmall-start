'use strict';

// array to hold all of the Goat objects
Merchandise.allMerchandise = [];

// make a Goat constructor for goat objects
function Merchandise(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  Merchandise.allMerchandise.push(this);
}

// new instances of Goats
new Merchandise('img/bag.jpg', 'r2d2 bag');
new Merchandise('img/banana.jpg', 'banana cutter');
new Merchandise('img/bathroom.jpg', 'bathroom ipad holder');
new Merchandise('img/boots.jpg', 'Sandal boots');
new Merchandise('img/bubblegum.jpg', 'meatball gym');
new Merchandise('img/breakfast.jpeg', 'breakfast maker');
// new Merchandise('img/wine-glass.jpeg', 'wine glass');
// new Merchandise('img/water-can.jpeg', 'watering can');
// new Merchandise('img/usb.gif', 'usb');
// new Merchandise('img/unicorn.jpg', 'unicorn');
// new Merchandise('img/tauntaun.jpg', 'tauntaun');
// new Merchandise('img/sweep.png', 'sweet');
// new Merchandise('img/shark.jpg', 'shark Blanket');
// new Merchandise('img/scissors.jpg', 'scissors');


// access the element from the DOM
var imgElement = document.getElementById('Merchandise-pix');

// add an event listener
imgElement.addEventListener('click', randomMerchandise);

// callback function when image is clicked:
function randomMerchandise() {
  // random number generator
  var randomIndex = Math.floor(Math.random() * Merchandise.allMerchandise.length);
  // use the randomIndex to set the src and alt attributes of the imgElement
  imgElement.src = Merchandise.allMerchandise[randomIndex].filepath;
  imgElement.alt = Merchandise.allMerchandise[randomIndex].name;
}

// render an image on page load
randomMerchandise();
'use strict';

// array to hold all of the Merch objects
Merchandise.allMerchandise = [];

// make a Merch constructor for Merch objects
function Merchandise(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  Merchandise.allMerchandise.push(this);
  this.clickCounter = 0;
  this.showCounter = 0;
  
}
var numTimesClicked = 0;
//when to store
//immediately
////pro: they are there for next time
//cons: zeros
//at the end
//pro: stores all the values of clicks and views
//con:partial data not caputred
//Aftr load / click
//pro:
//con:



// function setupMerch() {
//   var merchAsString = localStorage.getItem('merchandise');
//   var usableMerch = JSON.parse(merchAsString);
//   if (usableMerch && usableMerch.length) {
//     Merchandise.allMerchandise = usableMerch;
//     console.log("loaded from local storage");
//     return;
//   }

// new instances of Merch
new Merchandise('img/bag.jpg', 'r2d2 bag');
new Merchandise('img/banana.jpg', 'banana cutter');
new Merchandise('img/bathroom.jpg', 'bathroom ipad holder');
new Merchandise('img/boots.jpg', 'Sandal boots');
new Merchandise('img/bubblegum.jpg', 'meatball gym');
new Merchandise('img/breakfast.jpg', 'breakfast maker');
new Merchandise('img/wine-glass.jpg', 'wine glass');
new Merchandise('img/water-can.jpg', 'watering can');
new Merchandise('img/usb.gif', 'usb');
new Merchandise('img/unicorn.jpg', 'unicorn');
new Merchandise('img/tauntaun.jpg', 'tauntaun');
new Merchandise('img/sweep.png', 'sweet');
new Merchandise('img/shark.jpg', 'shark Blanket');
new Merchandise('img/scissors.jpg', 'scissors');


// access the element from the DOM
var leftElement = document.getElementById('left');
var middleElement= document.getElementById('middle');
var rightElement = document.getElementById('right');

// add an event listener
leftElement.addEventListener('click', randomMerchandise);
middleElement.addEventListener('click', randomMerchandise);
rightElement.addEventListener('click', randomMerchandise);

// callback function when image is clicked:
function randomMerchandise(event) {
  if(event !== undefined) {
    var model = Merchandise.allMerchandise[event.target.dataset['merchandise']];
    model.clickCounter ++;
    numTimesClicked ++;
    console.log(Merchandise.allMerchandise);
    
  }
  if(numTimesClicked === 25 ) {
    leftElement.removeEventListener('click', randomMerchandise);
    middleElement.removeEventListener('click', randomMerchandise);
    rightElement.removeEventListener('click', randomMerchandise);
    showNameScore();
  }  
  // random number generator
  var randomIndex = Math.floor(Math.random() * Merchandise.allMerchandise.length);
  var secondRandomIndex = Math.floor(Math.random() * Merchandise.allMerchandise.length);
  
  while( secondRandomIndex === randomIndex) {
    secondRandomIndex = Math.floor(Math.random() * Merchandise.allMerchandise.length);
  }
  var thirdRandomIndex = Math.floor(Math.random() * Merchandise.allMerchandise.length);
  
  while( thirdRandomIndex === randomIndex || thirdRandomIndex === secondRandomIndex) {
    thirdRandomIndex = Math.floor(Math.random() * Merchandise.allMerchandise.length);
  }
  // use the randomIndex to set the src and alt attributes of the imgElement
  leftElement.src = Merchandise.allMerchandise[randomIndex].filepath;
  leftElement.alt = Merchandise.allMerchandise[randomIndex].name;
  leftElement.dataset['merchandise'] = randomIndex;
  Merchandise.allMerchandise[randomIndex].showCounter++;
  
  middleElement.src = Merchandise.allMerchandise[secondRandomIndex].filepath;
  middleElement.alt = Merchandise.allMerchandise[secondRandomIndex].name;
  middleElement.dataset['merchandise'] = secondRandomIndex;
  Merchandise.allMerchandise[secondRandomIndex].showCounter++;
  
  rightElement.src = Merchandise.allMerchandise[thirdRandomIndex].filepath;
  rightElement.alt = Merchandise.allMerchandise[thirdRandomIndex].name;
  rightElement.dataset['merchandise'] = thirdRandomIndex;
  Merchandise.allMerchandise[thirdRandomIndex].showCounter++;
}

function showNameScore(){
  var scoreUl = document.getElementById('results');
  for(var i = 0; i < Merchandise.allMerchandise.length; i++) {
    var scoreLi = document.createElement('li');
    scoreLi.textContent = 'Products ' + Merchandise.allMerchandise[i].name + ' votes ' + Merchandise.allMerchandise[i].clickCounter;
    scoreUl.appendChild(scoreLi);
  }
}



// render an image on page load
randomMerchandise();



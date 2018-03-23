'use strict';

// array to hold all of the Merch objects
Merchandise.allMerchandise = [];

//track previously shown pix
Merchandise.lastDisplayed = [];

//barchart names
var merchNames = [];

//product votes for barchart
var merchVotes =[];

//clicktracker
var numTimesClicked = 0;

// make a Merch constructor for Merch objects
function Merchandise(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  Merchandise.allMerchandise.push(this);
  this.clickCounter = 0;
  this.displayCounter = 0;
  merchNames.push(this.name);
  merchVotes.push(0);
  
}
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
// }
// setupMerch();
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

//access section from DOM
var sectionElement = document.getElementById('merch-section');

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
    
    //update votes
    updateVotes();
    //display chart
    renderChart();
    return;
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
  Merchandise.allMerchandise[randomIndex].displayCounter++;
  
  middleElement.src = Merchandise.allMerchandise[secondRandomIndex].filepath;
  middleElement.alt = Merchandise.allMerchandise[secondRandomIndex].name;
  middleElement.dataset['merchandise'] = secondRandomIndex;
  Merchandise.allMerchandise[secondRandomIndex].displayCounter++;
  
  rightElement.src = Merchandise.allMerchandise[thirdRandomIndex].filepath;
  rightElement.alt = Merchandise.allMerchandise[thirdRandomIndex].name;
  rightElement.dataset['merchandise'] = thirdRandomIndex;
  Merchandise.allMerchandise[thirdRandomIndex].displayCounter++;
}

function showNameScore(){
  var scoreUl = document.getElementById('results');
  for(var i = 0; i < Merchandise.allMerchandise.length; i++) {
    var scoreLi = document.createElement('li');
    scoreLi.textContent = Merchandise.allMerchandise[i].name + ' displayed ' + Merchandise.allMerchandise[i].displayCounter + ' votes ' + Merchandise.allMerchandise[i].clickCounter;
    scoreUl.appendChild(scoreLi);
  }
}
function updateVotes() {
  for(var i in Merchandise.allMerchandise) {
    merchVotes[i] = Merchandise.allMerchandise[i].clickCounter;
  }
}
sectionElement.addEventListener('click', randomMerchandise);
// render an image on page load
randomMerchandise();

// //use chart.j to create a bar chart
function renderChart() {
  //access the canvas element from the dom
  var context = document.getElementById("merchandiseChart").getContext('2d');
  
  var merchandiseChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: merchNames, //array of merchanise names
      datasets: [{
        label: 'Votes per product',
        data: merchVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            stepSize:1,
            beginAtZero:true
          }
        }]
      }
    }
  });
}

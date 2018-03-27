const myDiv = document.getElementById('deck');
// Photos of dogs come from Pexels, licence: C0
let myDoggies = [
  'assets\\dog1.jpeg', 'assets\\dog2.jpeg', 'assets\\dog3.jpeg', 'assets\\dog4.jpeg',
  'assets\\dog5.jpeg', 'assets\\dog6.jpeg', 'assets\\dog7.jpeg', 'assets\\dog8.jpeg',
  'assets\\dog1.jpeg', 'assets\\dog2.jpeg', 'assets\\dog3.jpeg', 'assets\\dog4.jpeg',
  'assets\\dog5.jpeg', 'assets\\dog6.jpeg', 'assets\\dog7.jpeg', 'assets\\dog8.jpeg'
];

// reset
let reset = document.getElementById('restart');
reset.addEventListener('click', function () { window.location.reload(); });

//
let guessedCardsCounter = 0;
// main function of game

let openCardCounter = 0;
let previousCard;
// timer
let time = document.getElementById('timer');
let seconds = 0;

function add () {
  seconds++;
  time.textContent = seconds + ' s';
  timer();
}

function timer () {
  // end of counting
  if (guessedCardsCounter < 8) {
    setTimeout(add, 1000);
  }
}

timer();

// Moves Counter

let moveCounter = 0;

// stars
let stars = 3;
function starsCounter () {
  let points = document.getElementById('rating');
  if (moveCounter === 15) {
    points.children[0].children[0].className = 'far fa-star';
    stars--;
  }
  if (moveCounter === 25) {
    points.children[1].children[0].className = 'far fa-star';
    stars--;
  }
  if (moveCounter === 40) {
    points.children[2].children[0].className = 'far fa-star';
    stars--;
  }
}

function changeCard (evt) {
  if (evt.target.className === 'card2' && evt.target.style.opacity !== '1') {
    if (openCardCounter === 0) {
      evt.target.style.opacity = '1';
      previousCard = evt.target;
      openCardCounter += 1;
    } else if (openCardCounter === 1) {
      openCardCounter = 2;
      evt.target.style.opacity = 1;
      let movesCounterHTML = document.getElementById('moves');
      moveCounter += 1;
      movesCounterHTML.innerHTML = moveCounter;
      starsCounter();
      setTimeout(function () {
        // hide cards if they are different
        if (previousCard.src === evt.target.src) {
          guessedCardsCounter++;
          // winning conditions
          if (guessedCardsCounter === 8) {
            // Congratulation popup
            if (confirm('Congratulation! May the dog force be with you!!\nYour score: time ' + seconds + ' seconds, stars ' + stars + '\nDo you want to play again?')) {
              window.location.reload();
            }
          }
        } else {
          evt.target.style.opacity = 0;
          previousCard.style.opacity = 0;
        }
        openCardCounter = 0;
      }, 1000);
    }
  }
}

// clicking on cards

myDiv.addEventListener('click', changeCard);

const cards = document.getElementsByClassName('card2');
for (let i = 0; i < cards.length; i++) {
  const randomIndex = Math.floor(Math.random() * myDoggies.length);
  cards[i].src = myDoggies[randomIndex];
  myDoggies.splice(randomIndex, 1);
}

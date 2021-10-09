

var cards = document.querySelectorAll('.memory-card');

var hasFlippedCard = false;
var lockBoard = false;
var cardsFlipped = 0;
var firstCard;
var secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  var isMatch = firstCard.dataset.picture === secondCard.dataset.picture;


  
  isMatch ? disableCards() : unflipCards();
  
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  
  firstCard.classList.add("match");
  secondCard.classList.add("match");
  
  cardsFlipped += 2;
  
  resetBoard();
  checkDone();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(function() {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
	 
    resetBoard();
  }, 1500);
 
  
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null; 
  secondCard = null;
}

function checkDone() {
	if (cardsFlipped === 16) {
		setTimeout(function() {
			/* alert("Congratulations"); */
			var game = document.getElementById('memory');
			game.style.display = "none";
			var cong = document.getElementById('message');
			cong.style.display = "block"; 
			 
		}, 1000);
		cardsFlipped = 0;
	}
}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}


(function shuffle() {
  cards.forEach(function(card) {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

cards.forEach(function(card) { card.addEventListener('click', flipCard); });



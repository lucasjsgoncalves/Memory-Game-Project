const gridDisplay = document.querySelector(".grid");
const resetGamebtn = document.querySelector(".reset");
const winGame = document.querySelector(".win-game");
const playAgain = document.querySelector(".play-again");
const body = document.querySelector("body");
const navListItem = document.querySelector(".nav__list-item");
const howTo = document.querySelector(".how-to");
const howToBox = document.querySelector(".nav__how-to-play");
const closeHowto = document.querySelector(".how-to-close");
const overlayBody = document.querySelector(".body-overlay");

class App {
  html;

  cardArray = [
    { name: "jinx", img: "imgs/Jinx_Emote.webp" },
    { name: "lux", img: "imgs/Lux_Emote.webp" },
    { name: "darius", img: "imgs/Darius_Emote.webp" },
    { name: "heimerdinger", img: "imgs/Heimerdinger_Emote.webp" },
    { name: "kaisa", img: "imgs/kai'sa_Emote.webp" },
    { name: "teemo", img: "imgs/Teemo_Emote.webp" },
    { name: "jinx", img: "imgs/Jinx_Emote.webp" },
    { name: "lux", img: "imgs/Lux_Emote.webp" },
    { name: "darius", img: "imgs/Darius_Emote.webp" },
    { name: "heimerdinger", img: "imgs/Heimerdinger_Emote.webp" },
    { name: "kaisa", img: "imgs/kai'sa_Emote.webp" },
    { name: "teemo", img: "imgs/Teemo_Emote.webp" },
  ];

  cardsClicked = [];
  score = 0;
  combination = 0;

  constructor() {
    this.createBoard();

    gridDisplay.addEventListener("click", this.flipcard.bind(this));
    resetGamebtn.addEventListener("click", this.resetGame.bind(this));
    playAgain.addEventListener("click", this.resetGame.bind(this));
    howTo.addEventListener("click", this.howToPlay.bind(this));

    navListItem.addEventListener("click", this.closeHowtoPlay.bind(this));

    overlayBody.addEventListener("click", this.test.bind(this));
  }

  createBoard() {
    this.cardArray.sort(() => 0.5 - Math.random());

    this.cardArray.forEach((card, i) => {
      this.html = `
      <div data-id="${i}" class="card" draggable="false">
        <div class="card__face card__face--front">
          <img src="${card.img}" alt="card" />
        </div>
  
        <div class="card__face card__face--back">
          <img src="imgs/The_Council_Emote.webp" alt="back of the card" />
        </div>
      </div>
   `;

      gridDisplay.insertAdjacentHTML("afterbegin", this.html);
    });
  }

  flipcard(e) {
    let gameState = true;
    const card = e.target.closest(".card");

    if (!card) return;
    card.classList.add("flip");

    if (this.cardsClicked.length === 0) {
      this.cardsClicked.push(card);
    }

    if (
      this.cardsClicked[0].dataset.id !== card.dataset.id &&
      this.cardsClicked.length < 2
    ) {
      this.cardsClicked.push(card);
    }

    if (this.cardsClicked.length === 2) {
      gridDisplay.classList.add("pointer-none");

      setTimeout(this.checkMatch.bind(this), 1500);
    }
  }

  checkMatch() {
    if (
      this.cardArray[this.cardsClicked[0].dataset.id].name ===
      this.cardArray[this.cardsClicked[1].dataset.id].name
    ) {
      this.combination++;
      if (this.combination === 6) {
        winGame.style.opacity = 1;
        winGame.style.zIndex = 1;
        body.classList.add("overlay");
      }

      this.cardsClicked.forEach((card) => {
        card.classList.add("pointer-none");
        card.classList.add("matched");
      });
    } else {
      this.score++;

      this.cardsClicked.forEach((card) => {
        card.classList.remove("flip");
      });
      document.querySelector(".result").textContent = this.score;
    }

    gridDisplay.classList.remove("pointer-none");
    this.cardsClicked = [];

    console.log(this.combination);
  }

  resetGame() {
    gridDisplay.style.opacity = 0;
    winGame.style.opacity = 0;
    winGame.style.zIndex = -1;
    body.classList.remove("overlay");

    setTimeout(this.resetAnimation.bind(this), 600);
  }

  resetAnimation() {
    gridDisplay.innerHTML = "";
    this.cardsClicked = [];
    this.score = 0;
    this.combination = 0;
    document.querySelector(".result").textContent = this.score;

    this.createBoard();
    gridDisplay.style.opacity = 1;
  }

  howToPlay(e) {
    howToBox.classList.remove("hidden");
    overlayBody.classList.remove("hidden");
  }

  closeHowtoPlay(e) {
    if (!e.target.classList.contains("how-to-close")) return;
    howToBox.classList.add("hidden");
    overlayBody.classList.add("hidden");
  }

  test() {
    howToBox.classList.add("hidden");
    overlayBody.classList.add("hidden");
  }
}

const app = new App();

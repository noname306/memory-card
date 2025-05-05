const board = document.getElementById("gameBoard");

let cardValues = [1, 2, 3, 4, 5, 6, 7, 8];
cardValues = [...cardValues, ...cardValues]; // две копии каждой
cardValues.sort(() => Math.random() - 0.5); // перемешать

let flippedCards = [];
let lockBoard = false;

function createCard(value) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = value;
  card.innerText = "";
  
  card.addEventListener("click", () => {
    if (lockBoard || card.classList.contains("flipped") || card.classList.contains("matched")) return;

    card.classList.add("flipped");
    card.innerText = value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  });

  return card;
}

function checkMatch() {
  lockBoard = true;
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    resetFlips();
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "";
      card2.innerText = "";
      resetFlips();
    }, 1000);
  }
}

function resetFlips() {
  flippedCards = [];
  lockBoard = false;
}

// Создание карточек
cardValues.forEach(value => {
  const card = createCard(value);
  board.appendChild(card);
});

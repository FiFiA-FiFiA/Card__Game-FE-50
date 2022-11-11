const GameBoard__Wrapper = document.querySelector("[GameBoard__Wrapper]");
const Start__Btn__Container = document.querySelector("[Start__Btn__Container]");
const Btn__Start = document.querySelector("[Btn__Start]");
const Card__Arrival__Positons = document.querySelectorAll("[Card__Arrival__Positons]");
const Player__Card = document.querySelectorAll("[Player__Card]");
const Player1__Cards = document.querySelectorAll("[Player1__Cards]");
const Player2__Cards = document.querySelectorAll("[Player2__Cards]");
const All__Cards__Wrapper = document.querySelector("[All__Cards__Wrapper]");
const All__Card__Counter = document.querySelector("[All__Card__Counter]");

const TYPE = ["♠", "♥", "♦", "♣"];
const VALUE = ["10", "J", "Q", "K", "A"];

class Deck {
  constructor(Cards = NewDeck()) {
    this.Cards = Cards;
  }
}

class Card {
  constructor(Type, Value) {
    this.Type = Type;
    this.Value = Value;
    this.Img = `./Images/Card_${Type}_${Value}.png`;
  }
}

function NewDeck() {
  return TYPE.flatMap(type => {
    return VALUE.flatMap(value => {
      return new Card(type, value)
    });
  });
}
const deck = new Deck();

function Close__Start__Container() {
  Start__Btn__Container.classList.add("hidden");
  Start__Game();
}

function Start__Game() {
  GameBoard__Wrapper.classList.add("active");

  Create__All__Cards();
}

function Create__All__Cards() {
  let deck__Cards = deck.Cards;
  let Random__Num = Math.floor(Math.random() * 19);

  All__Cards__Wrapper.innerHTML = "";

  for (const i in deck__Cards) {
    let Card = document.createElement('div');
    Card.classList.add("Card", "flip");
    Card.setAttribute("All__Cards", ``);
    Card.setAttribute("Value", `${deck__Cards[i].Value}`);
    Card.setAttribute("Type", `${deck__Cards[i].Type}`);
    Card.setAttribute("Id", `${i}`);
    Card.style.left = `${i / 5}px`;
    Card.style.zIndex = -i;

    Card.innerHTML = `
    <div class="Card__Inner">
      <div class="Card__Front">
        <img src="${deck__Cards[i].Img}" alt="">
      </div>
      <div class="Card__Back">
      <img src="./Images/Card__Back.png" alt="">
      </div>
    </div>`;

    All__Cards__Wrapper.appendChild(Card);
  }

  let All__Cards = document.querySelectorAll("[All__Cards]");

  All__Cards.forEach(card => {
    All__Cards[Random__Num].classList.add("rotate");
    All__Cards[Random__Num].classList.remove("flip");
    All__Cards[Random__Num].style.zIndex = -20;
  });
  // console.log(deck__Cards.findIndex(deck__Cards[Random__Num]));

  All__Card__Counter.textContent = All__Cards.length;

  Dealing__Cards();
}

function Dealing__Cards() {

  let All__Cards = document.querySelectorAll("[All__Cards]");

  let Temp = [];

  while (Temp.length != 6) {
    let random__Index = Math.floor(Math.random() * All__Cards.length);

    if (!Temp.includes(random__Index)) {
      if (!All__Cards[random__Index].classList.contains('rotate')) {
        Temp.push(random__Index);
      }
    }
  }

  let First3__Card = Temp.slice(0, 3);
  let Last3__Card = Temp.slice(-3);

  for (const i in First3__Card) {
    Create__Player1__Cards(All__Cards[First3__Card[i]].querySelector(".Card__Inner"), i)
  }
  for (const i in Last3__Card) {
    Create__Player2__Cards(All__Cards[Last3__Card[i]].querySelector(".Card__Inner"), i)
  }
}

function Create__Player1__Cards(cards, i) {

  let Player__Card = document.createElement('div');
  Player__Card.classList.add("Card");
  Player__Card.setAttribute("Player__1__Card", "");
  Player__Card.appendChild(cards);

  Player1__Cards[i].appendChild(Player__Card)


  document.querySelectorAll("[Player__1__Card]").forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      if (card.classList.contains('selected')) {
        card.setAttribute('Selected', "true");
      } else {
        card.setAttribute('Selected', "false");
      }
    });
  });
}

function Create__Player2__Cards(cards, i) {
  let Player__Card = document.createElement('div');
  Player__Card.classList.add("Card");
  Player__Card.setAttribute("Player__2__Card", "");
  Player__Card.appendChild(cards);

  Player2__Cards[i].appendChild(Player__Card);

  document.querySelectorAll("[Player__2__Card]").forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      if (card.classList.contains('selected')) {
        card.setAttribute('Selected', "true");
      } else {
        card.setAttribute('Selected', "false");
      }
    });
  });
}

Btn__Start.addEventListener('click', Close__Start__Container)
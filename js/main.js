const GameBoard__Wrapper = document.querySelector("[GameBoard__Wrapper]");
const Start__Btn__Container = document.querySelector("[Start__Btn__Container]");
const Btn__Start = document.querySelector("[Btn__Start]");
const Card__Arrival__Positons = document.querySelectorAll("[Card__Arrival__Positons]");
const All__Cards__Wrapper = document.querySelector("[All__Cards__Wrapper]");
const All__Card__Counter = document.querySelector("[All__Card__Counter]");

const First__Player__Cards__Wrapper = document.querySelector("[First__Player__Cards__Wrapper]");
const First__Cards__Wrapper = document.querySelectorAll("[First__Player__Cards__Wrapper] [Cards__Wrapper]");
const Second__Player__Cards__Wrapper = document.querySelector("[Second__Player__Cards__Wrapper]");
const Second__Cards__Wrapper = document.querySelectorAll("[Second__Player__Cards__Wrapper] [Cards__Wrapper]");

const First__Player__Action__Buttons = document.querySelector("[First__Player__Action__Buttons]");
const Second__Player__Action__Buttons = document.querySelector("[Second__Player__Action__Buttons]");

const FP__Btn__GiveIt = document.querySelector("[FP__Btn__GiveIt]");
const FP__Btn__CutIt = document.querySelector("[FP__Btn__CutIt]");
const FP__Btn__Dav = document.querySelector("[FP__Btn__Dav]");

const SP__Btn__GiveIt = document.querySelector("[SP__Btn__GiveIt]");
const SP__Btn__CutIt = document.querySelector("[SP__Btn__CutIt]");
const SP__Btn__Dav = document.querySelector("[SP__Btn__Dav]");

const FP__Arrival__Wrapper = document.querySelector("[FP__Arrival__Wrapper]");
const SP__Arrival__Wrapper = document.querySelector("[SP__Arrival__Wrapper]");

class Card {
  constructor(Type, Suit, Value) {
    this.Type = Type;
    this.Value = Value;
    this.Img = `./Images/Card_${Type}_${Suit}.png`;
  }
}

let Cards__Arr = [
  new Card("♠", "10", 10),
  new Card("♠", "A", 11),
  new Card("♠", "J", 2),
  new Card("♠", "Q", 3),
  new Card("♠", "K", 4),
  new Card("♥", "10", 10),
  new Card("♥", "A", 11),
  new Card("♥", "J", 2),
  new Card("♥", "Q", 3),
  new Card("♥", "K", 4),
  new Card("♦", "10", 10),
  new Card("♦", "A", 11),
  new Card("♦", "J", 2),
  new Card("♦", "Q", 3),
  new Card("♦", "K", 4),
  new Card("♣", "10", 10),
  new Card("♣", "A", 11),
  new Card("♣", "J", 2),
  new Card("♣", "Q", 3),
  new Card("♣", "K", 4),
];
let Cards = Cards__Arr;

let First__Player = false;
let Second__Player = false;

function Show__First__Player__Card(Status) {
  if (First__Player == Status) {
    First__Player = true;
    Second__Player = false;
    First__Player__Cards__Wrapper.classList.add("Cards__Show")
    Second__Player__Cards__Wrapper.classList.remove("Cards__Show")
    First__Player__Action__Buttons.classList.remove("active");
    Second__Player__Action__Buttons.classList.add("active");
  } else {
    First__Player = false;
    Second__Player = true;
    Second__Player__Cards__Wrapper.classList.add("Cards__Show");
    First__Player__Cards__Wrapper.classList.remove("Cards__Show");
    Second__Player__Action__Buttons.classList.remove("active");
    First__Player__Action__Buttons.classList.add("active");
  }
}

Show__First__Player__Card(true);

function Close__Start__Container() {
  Start__Btn__Container.classList.add("hidden");
  Start__Game();
}

function Start__Game() {
  GameBoard__Wrapper.classList.add("active");
  Create__All__Cards();
}

function Create__All__Cards() {
  let NewCards = [];
  let Random__Index__Arr = [];

  All__Cards__Wrapper.innerHTML = "";

  while (Random__Index__Arr.length != 20) {
    let Random__Index = Math.floor(Math.random() * Cards.length);

    if (!Random__Index__Arr.includes(Random__Index)) {
      Random__Index__Arr.push(Random__Index);
    }
  }

  for (const I in Random__Index__Arr) {
    NewCards.push(Cards[Random__Index__Arr[I]]);

    let Card = document.createElement('div');
    Card.classList.add("Card", "flip");
    Card.setAttribute("All__Cards", ``);
    Card.setAttribute("Value", `${Cards[Random__Index__Arr[I]].Value}`);
    Card.setAttribute("Type", `${Cards[Random__Index__Arr[I]].Type}`);
    Card.setAttribute("Id", `${I}`);
    Card.style.left = `${I / 10}px`;
    Card.style.zIndex = -I;

    Card.innerHTML = `
    <div class="Card__Inner">
      <div class="Card__Front">
        <img src="${Cards[Random__Index__Arr[I]].Img}" alt="">
      </div>
      <div class="Card__Back">
      <img src="./Images/Card__Back.png" alt="">
      </div>
    </div>`;

    All__Cards__Wrapper.appendChild(Card);
  }

  Cards = NewCards;

  let All__Cards = document.querySelectorAll("[All__Cards]");
  let Trump = Cards.length - 1;

  All__Cards[Trump].classList.add("rotate");
  All__Cards[Trump].classList.remove("flip");

  Dealing__Cards(Cards, Trump);
}

function Dealing__Cards(Cards, Trump) {
  let Player__Cards__Arr = [];
  let FirstPlayer__Cards__Arr = [];
  let SecondPlayer__Cards__Arr = [];
  let Cards__Arr = Cards;
  let First__Counter = 0;
  let Second__Counter = 0;
  let Counter = 0;
  let Delete__Index;
  let TrumpType = Cards__Arr[Trump].Type;

  for (const Index in First__Cards__Wrapper) {
    if (First__Cards__Wrapper[Index].innerHTML == "") {
      First__Counter++;
    }
    if (Second__Cards__Wrapper[Index].innerHTML == "") {
      Second__Counter++;
    }
  }

  Counter = First__Counter + Second__Counter;

  for (let i = 0; i < Counter; i++) {
    Player__Cards__Arr.push(Cards__Arr[i]);
    Delete__Index = Cards__Arr.indexOf(Cards__Arr[i]);
    Cards__Arr.shift(Delete__Index);

    All__Card__Counter.textContent = Cards__Arr.length;
  }

  for (const Index in First__Cards__Wrapper) {
    if (First__Cards__Wrapper[Index].innerHTML == "") {
      FirstPlayer__Cards__Arr.push(Player__Cards__Arr.shift(Player__Cards__Arr[[Index]]))
    }
  }

  for (const Index in Second__Cards__Wrapper) {
    if (Second__Cards__Wrapper[Index].innerHTML == "") {
      SecondPlayer__Cards__Arr.push(Player__Cards__Arr.shift(Player__Cards__Arr[[Index]]));
    }
  }

  let First__Empty__Card = [...First__Cards__Wrapper].filter(i => i.innerHTML == "");
  let Second__Empty__Card = [...Second__Cards__Wrapper].filter(i => i.innerHTML == "");

  for (const Index in FirstPlayer__Cards__Arr) {
    if (First__Cards__Wrapper[Index].innerHTML == "") {
      let Card = document.createElement('div');
      Card.classList.add("Card");
      Card.setAttribute("Player__Cards", ``);
      Card.setAttribute("Value", `${FirstPlayer__Cards__Arr[Index].Value}`);
      Card.setAttribute("Type", `${FirstPlayer__Cards__Arr[Index].Type}`);

      Card.innerHTML = `
      <div class="Card__Inner">
        <div class="Card__Front">
          <img src="${FirstPlayer__Cards__Arr[Index].Img}" alt="">
        </div>
        <div class="Card__Back">
        <img src="./Images/Card__Back.png" alt="">
        </div>
      </div>`;

      First__Empty__Card[Index].appendChild(Card);
    }
  }

  for (const Index in SecondPlayer__Cards__Arr) {
    if (Second__Cards__Wrapper[Index].innerHTML == "") {
      let Card = document.createElement('div');
      Card.classList.add("Card");
      Card.setAttribute("Player__Cards", ``);
      Card.setAttribute("Value", `${SecondPlayer__Cards__Arr[Index].Value}`);
      Card.setAttribute("Type", `${SecondPlayer__Cards__Arr[Index].Type}`);

      Card.innerHTML = `
      <div class="Card__Inner">
        <div class="Card__Front">
          <img src="${SecondPlayer__Cards__Arr[Index].Img}" alt="">
        </div>
        <div class="Card__Back">
        <img src="./Images/Card__Back.png" alt="">
        </div>
      </div>`;

      Second__Empty__Card[Index].appendChild(Card);
    }
  }

  let First__Player__Cards = document.querySelectorAll("[first__player__cards__wrapper] .Cards__Wrapper [player__cards]");
  let Second__Player__Cards = document.querySelectorAll("[Second__player__cards__wrapper] .Cards__Wrapper [player__cards]");

  let FP__Selected__Arr = [];
  let SP__Selected__Arr = [];

  First__Player__Cards.forEach(Cards => {
    Cards.addEventListener('click', () => {
      let CardType = Cards.getAttribute("Type");
      if (FP__Selected__Arr != "") {
        if (!Cards.classList.contains("selected")) {
          Cards.classList.add("selected");
          if (FP__Selected__Arr.includes(CardType)) {
            Cards.classList.add("selected");
            FP__Selected__Arr.push(CardType);
          } else {
            let findIndex = FP__Selected__Arr.findIndex(i => i == CardType)
            FP__Selected__Arr.shift(FP__Selected__Arr[findIndex]);
            FP__Selected__Arr.shift(FP__Selected__Arr[findIndex]);
            First__Player__Cards.forEach(Close => { Close.classList.remove("selected") });
            Cards.classList.add("selected");
            FP__Selected__Arr.push(CardType);
          }
        } else {
          Cards.classList.remove("selected");
          let findIndex = FP__Selected__Arr.findIndex(i => i == CardType)
          FP__Selected__Arr.shift(FP__Selected__Arr[findIndex]);
        }
      } else {
        Cards.classList.add("selected");
        FP__Selected__Arr.push(CardType);
      }

      if (FP__Selected__Arr != "") {
        FP__Btn__GiveIt.classList.remove("disabled");
        FP__Btn__Dav.classList.remove("disabled");
      } else {
        FP__Btn__GiveIt.classList.add("disabled");
        FP__Btn__Dav.classList.add("disabled");
      }
    });
  });

  Second__Player__Cards.forEach(Cards => {
    Cards.addEventListener('click', () => {
      let CardType = Cards.getAttribute("Type");
      if (SP__Selected__Arr != "") {
        if (!Cards.classList.contains("selected")) {
          Cards.classList.add("selected");
          if (SP__Selected__Arr.includes(CardType)) {
            Cards.classList.add("selected");
            SP__Selected__Arr.push(CardType);
          } else {
            let findIndex = SP__Selected__Arr.findIndex(i => i == CardType)
            SP__Selected__Arr.shift(SP__Selected__Arr[findIndex]);
            SP__Selected__Arr.shift(SP__Selected__Arr[findIndex]);
            Second__Player__Cards.forEach(Close => { Close.classList.remove("selected") });
            Cards.classList.add("selected");
            SP__Selected__Arr.push(CardType);
          }
        } else {
          Cards.classList.remove("selected");
          let findIndex = SP__Selected__Arr.findIndex(i => i == CardType)
          SP__Selected__Arr.shift(SP__Selected__Arr[findIndex]);
        }
      } else {
        Cards.classList.add("selected");
        SP__Selected__Arr.push(CardType);
      }

      if (SP__Selected__Arr != "") {
        SP__Btn__GiveIt.classList.remove("disabled");
        SP__Btn__Dav.classList.remove("disabled");
      } else {
        SP__Btn__GiveIt.classList.add("disabled");
        SP__Btn__Dav.classList.add("disabled");
      }
    });
  });

  FP__Btn__GiveIt.addEventListener('click', () => {
    let Selected__Card = [...First__Player__Cards].filter(i => i.classList.contains("selected"));
    for (const I in Selected__Card) {
      FP__Arrival__Wrapper.appendChild(Selected__Card[I])
    }
    Show__First__Player__Card(false);
  });

  SP__Btn__GiveIt.addEventListener('click', () => {
    let Selected__Card = [...Second__Player__Cards].filter(i => i.classList.contains("selected"));
    for (const I in Selected__Card) {
      SP__Arrival__Wrapper.appendChild(Selected__Card[I])
    }
    Show__First__Player__Card(true);
  });
}

Btn__Start.addEventListener('click', Close__Start__Container)
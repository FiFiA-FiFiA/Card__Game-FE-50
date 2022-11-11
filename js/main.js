const GameBoard__Wrapper = document.querySelector("[GameBoard__Wrapper]");
const Start__Btn__Container = document.querySelector("[Start__Btn__Container]");
const Btn__Start = document.querySelector("[Btn__Start]");
const Card__Arrival__Positons = document.querySelectorAll("[Card__Arrival__Positons]");
const Player__Card = document.querySelectorAll("[Player__Card]");
const Player__Card__Pos = document.querySelectorAll("[Player__Card__Pos]");

function Close__Start__Container() {
  Start__Btn__Container.classList.add("hidden");

  Start__Game();
}

function Start__Game() {
  GameBoard__Wrapper.classList.add("active");


  let x, y, x2, y2;

  Card__Arrival__Positons.forEach((card, i) => {
    x = card.getBoundingClientRect().x
    y = card.getBoundingClientRect().y

    x2 = Player__Card__Pos[i].getBoundingClientRect().x
    y2 = Player__Card__Pos[i].getBoundingClientRect().y

    x = x - x2;
    y = y - y2;

    Player__Card[i].style.top = `${y + 1.5}px`;
    Player__Card[i].style.left = `${x + 2}px`;

    window.addEventListener("resize", () => {
      x = card.getBoundingClientRect().x
      y = card.getBoundingClientRect().y

      x2 = Player__Card__Pos[i].getBoundingClientRect().x
      y2 = Player__Card__Pos[i].getBoundingClientRect().y

      x = x - x2;
      y = y - y2;

      Player__Card[i].style.top = `${y + 1.5}px`;
      Player__Card[i].style.left = `${x + 2}px`;
    })

  });
}

Btn__Start.addEventListener('click', Close__Start__Container)
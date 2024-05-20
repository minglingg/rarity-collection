const cardHolders = document.querySelectorAll("section article");
const cards = document.querySelectorAll("section article figure");
const navBtns = document.querySelectorAll("nav li");
const variations = ["plastic", "gold", "pearl", "holographic"];
let currVariation = variations[0];
let navDisabled = false;

navBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    if (navDisabled) return;

    if (!e.currentTarget.classList.contains("on")) {
      navDisabled = true;
      const newVariation = e.currentTarget.classList.item(0);

      // select nav item
      for (let btn of navBtns) btn.classList.remove("on");
      e.currentTarget.classList.add("on");

      // swap card design
      for (let cardHolder of cardHolders) cardHolder.classList.add("flip");
      setTimeout(() => {
        for (let card of cards) swapCardTo(card, newVariation);
      }, 800);
      setTimeout(() => {
        for (let cardHolder of cardHolders) cardHolder.classList.remove("flip");
        navDisabled = false;
        currVariation = newVariation;
      }, 1800);
    }
  });
});

function swapCardTo(card, newVariation) {
  // change texture
  for (let variation of variations) card.classList.remove(variation);
  card.classList.add(newVariation);

  //change img
  const cardImg = card.querySelector("img");
  const oldSrc = cardImg.getAttribute("src");
  card
    .querySelector("img")
    .setAttribute("src", oldSrc.replace(currVariation, newVariation));
}

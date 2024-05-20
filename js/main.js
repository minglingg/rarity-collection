const cards = document.querySelectorAll("section article");
const navBtns = document.querySelectorAll("nav li");
const variations = ["plastic", "gold", "pearl", "holographic"];
let currVariation = variations[0];

navBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    if (!e.currentTarget.classList.contains("on")) {
      const newVariation = e.currentTarget.classList.item(0);

      // select nav item
      for (let btn of navBtns) btn.classList.remove("on");
      e.currentTarget.classList.add("on");

      // swap card design
      for (let card of cards) swapCardTo(card, newVariation);

      currVariation = newVariation;
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

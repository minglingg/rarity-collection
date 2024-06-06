const paint = document.querySelector("#paint");
const spreadedCardHolders = document.querySelectorAll("section article");
const spreadedCards = document.querySelectorAll("section article figure");
const cards = document.querySelectorAll("article figure");
const featuredModal = document.querySelector("#modal");
const featuredCard = featuredModal.querySelector("article figure");
const navBtns = document.querySelectorAll("nav li");

const variations = ["plastic", "gold", "pearl", "holographic"];
let currVariation = variations[0];
let navDisabled = false;

// card animations
cards.forEach((card) => {
  const textures = card.querySelectorAll(".texture");
  const overlay = card.querySelector(".overlay");
  card.addEventListener("mousemove", (e) => {
    let { width, height } = document.defaultView.getComputedStyle(card);
    width = parseFloat(width.replace("px", ""));
    height = parseFloat(height.replace("px", ""));
    const percentX = (e.offsetX / width) * 100;
    const percentY = (e.offsetY / height) * 100;

    const rotateX = 0.6 * Math.max(0, percentY) - 30;
    const rotateY = -0.6 * Math.max(0, percentX) + 30;

    switch (currVariation) {
      case "pearl":
        overlay.style = `background-position: ${100 - percentX}% ${
          100 - percentY
        }%;
        filter: opacity(0.4)`;
        for (let texture of textures)
          texture.style = `background-position: ${(percentX + percentY) / 2}%`;
        break;
      default:
        overlay.style = `background-position: ${percentX}% ${percentY}%;
        filter: opacity(${percentX / 200 + 0.5})`;
        for (let texture of textures)
          texture.style = `background-position: ${(percentX + percentY) / 2}%`;
        break;
    }

    card.style = `transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseout", () => {
    overlay.style = "filter: opacity(0)";
    card.style = "transform: rotateY(0deg) rotateX(0deg)";
  });
});

// set featured card
spreadedCards.forEach((spreadedCard) => {
  spreadedCard.addEventListener("click", (e) => {
    const featuredVariation = e.currentTarget.classList.item(0);
    const featuredImgSrc = spreadedCard
      .querySelector("img")
      .getAttribute("src");

    const prevFeaturedVariation = featuredCard.classList.item(0);
    featuredCard.classList.remove(prevFeaturedVariation);
    featuredCard.classList.add(featuredVariation);

    const featuredImg = featuredCard.querySelector("img");
    featuredImg.setAttribute("src", featuredImgSrc);

    featuredModal.classList.add("on");
  });
});

featuredModal.addEventListener("click", (e) => {
  //when inner content clicked
  if (e.target !== e.currentTarget) return;

  e.currentTarget.classList.remove("on");
});

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

      // swap paint color
      for (let variation of variations) paint.classList.remove(variation);
      paint.classList.add(newVariation);

      // swap card design
      for (let cardHolder of spreadedCardHolders)
        cardHolder.classList.add("flip");
      setTimeout(() => {
        for (let card of spreadedCards) swapCardTo(card, newVariation);
      }, 800);
      setTimeout(() => {
        for (let cardHolder of spreadedCardHolders)
          cardHolder.classList.remove("flip");
        navDisabled = false;
        currVariation = newVariation;
        console.log(currVariation);
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

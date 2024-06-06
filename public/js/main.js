const loadingModal = document.querySelector("#loading");
const loadingTmpContainer = loadingModal.querySelector("div");

const featuredModal = document.querySelector("#featured");
const featuredCard = featuredModal.querySelector("article figure");

const paint = document.querySelector("#paint");
const spreadedCardHolders = document.querySelectorAll("section article");
const spreadedCards = document.querySelectorAll("section article figure");
const cards = document.querySelectorAll("article figure");

const materials = ["plastic", "gold", "pearl", "holographic"];
let currMaterial = materials[0];
let navDisabled = false;

// block mobile scroll
document.querySelector("body").addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
  },
  { passive: false }
);
document.querySelector("body").addEventListener(
  "scroll",
  (e) => {
    e.preventDefault();
  },
  { passive: false }
);

// Loading Modal: load img asset
const haveToLoad = [
  "card_back.png",
  "paint.png",
  "gold_3.svg",
  "gold_A.svg",
  "gold_K.svg",
  "gold_Q.svg",
  "gold.png",
  "holographic_3.svg",
  "holographic_A.svg",
  "holographic_K.svg",
  "holographic_Q.svg",
  "holographic.png",
  "pearl_3.svg",
  "pearl_A.svg",
  "pearl_K.svg",
  "pearl_Q.svg",
  "pearl.png",
  "plastic_3.svg",
  "plastic_A.svg",
  "plastic_K.svg",
  "plastic_Q.svg",
];

const List = [];
for (let imgSrc of haveToLoad) {
  List.push(`
            <img src="./src/${imgSrc}"/>
        `);
}
loadingTmpContainer.innerHTML = List.join("");

const loadingTmps = loadingTmpContainer.querySelectorAll("img");
let cntLoad = 0;

loadingTmps.forEach((loadingTmp) => {
  loadingTmp.addEventListener("load", () => {
    cntLoad++;

    if (cntLoad == haveToLoad.length) {
      loadingModal.classList.add("finished");
    }
  });
});

// Featured Modal: set featured card
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
  // when inner content clicked
  if (e.target !== e.currentTarget) return;

  e.currentTarget.classList.remove("on");
});

// Spreaded Card: card animations
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    animateCard(card, e.offsetX, e.offsetY);
  });
  card.addEventListener("touchmove", (e) => {
    const { left, top } = card.getBoundingClientRect();
    const { clientX, clientY } = e.targetTouches[0];
    const offsetX = clientX - left;
    const offsetY = clientY - top;
    animateCard(card, offsetX, offsetY);
  });

  card.addEventListener("mouseout", () => resetCard(card));
  card.addEventListener("touchend", (e) => {
    resetCard(card);
  });
});

function animateCard(card, offsetX, offsetY) {
  const textures = card.querySelectorAll(".texture");
  const overlay = card.querySelector(".overlay");

  let { width, height } = document.defaultView.getComputedStyle(card);
  width = parseFloat(width.replace("px", ""));
  height = parseFloat(height.replace("px", ""));
  const percentX = (offsetX / width) * 100;
  const percentY = (offsetY / height) * 100;

  const rotateX = 0.6 * Math.max(0, percentY) - 30;
  const rotateY = -0.6 * Math.max(0, percentX) + 30;

  switch (currMaterial) {
    case "pearl":
      overlay.style = `background-position: ${-0.2 * percentX + 60}% ${
        -0.3 * percentY + 65
      }%;
        filter: opacity(0.2)`;
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
}

function resetCard(card) {
  const overlay = card.querySelector(".overlay");
  overlay.style = "filter: opacity(0)";
  card.style = "transform: rotateY(0deg) rotateX(0deg)";
}

// Nav
const navBtns = document.querySelectorAll("nav li");

navBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    if (navDisabled) return;

    if (!e.currentTarget.classList.contains("on")) {
      navDisabled = true;
      const newMaterial = e.currentTarget.classList.item(0);

      // select nav item
      for (let btn of navBtns) btn.classList.remove("on");
      e.currentTarget.classList.add("on");

      // swap paint color
      for (let variation of materials) paint.classList.remove(variation);
      paint.classList.add(newMaterial);

      // swap card design
      for (let cardHolder of spreadedCardHolders)
        cardHolder.classList.add("flip");
      setTimeout(() => {
        for (let card of spreadedCards) swapCardTo(card, newMaterial);
      }, 800);
      setTimeout(() => {
        for (let cardHolder of spreadedCardHolders)
          cardHolder.classList.remove("flip");
        navDisabled = false;
        currMaterial = newMaterial;
      }, 1800);
    }
  });
});

function swapCardTo(card, newMaterial) {
  // change texture
  for (let variation of materials) card.classList.remove(variation);
  card.classList.add(newMaterial);

  //change img
  const cardImg = card.querySelector("img");
  const oldSrc = cardImg.getAttribute("src");
  card
    .querySelector("img")
    .setAttribute("src", oldSrc.replace(currMaterial, newMaterial));
}

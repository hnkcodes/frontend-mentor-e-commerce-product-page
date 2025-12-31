let itemNumber = 0;
let cartNumber = 0;
let mainImgIndex = 1;
let modalImgIndex;
const totalImgNum = 4;

const plusButton = document.getElementById("plus-button");
const minusButton = document.getElementById("minus-button");
const itemNumberDisplay = document.getElementById("item-number");
const cartIconNumber = document.querySelector(".cart-icon-number");
const addToCartButton = document.querySelector(".add-to-cart-button");
const cartContent = document.querySelector(".cart-content");
const empty = document.querySelector(".empty");
const notEmpty = document.querySelector(".not-empty");
const dismissButton = document.getElementById("dismiss-items-button");
const cartButton = document.getElementById("cart-button");
const cartPopup = document.querySelector(".cart-popup");
const checkoutButton = document.getElementById("checkout-button");

const mainRoot = document.querySelector(".main");
const modalRoot = document.querySelector(".modal");

const dialog = document.querySelector("dialog");
const showDialog = document.querySelectorAll(".show-dialog");
const closeDialog = document.getElementById("close-dialog");

const nextBtn = document.getElementById("next-button");
console.log(nextBtn);
const prevBtn = document.getElementById("previous-button");

function renderCartUI() {
  if (cartNumber > 0) {
    empty.classList.add("inactive");
    notEmpty.classList.remove("inactive");
  } else {
    empty.classList.remove("inactive");
    notEmpty.classList.add("inactive");
  }

  cartContent.textContent = `$125.00 × ${cartNumber} $${125 * cartNumber}.00`;

  cartIconNumber.textContent = itemNumber;

  if (cartNumber === 0) {
    cartIconNumber.classList.add("initial");
  } else {
    cartIconNumber.classList.remove("initial");
  }
}

function renderItemNumberUI() {
  itemNumberDisplay.textContent = itemNumber;
}

function hidePopup() {
  cartPopup.classList.add("inactive");
}

plusButton.addEventListener("click", () => {
  itemNumber = itemNumber + 1;

  renderItemNumberUI();
  hidePopup();
});

minusButton.addEventListener("click", () => {
  if (itemNumber <= 0) {
    return;
  }

  itemNumber = itemNumber - 1;
  renderItemNumberUI();
  hidePopup();
});

addToCartButton.addEventListener("click", () => {
  if (itemNumber < 0) {
    return;
  }

  cartNumber = itemNumber;
  renderCartUI();
});

dismissButton.addEventListener("click", () => {
  cartNumber = 0;
  itemNumber = 0;

  renderCartUI();
  renderItemNumberUI();
});

cartButton.addEventListener("click", () => {
  cartPopup.classList.toggle("inactive");
});

checkoutButton.addEventListener("click", () => {
  hidePopup();
});

function getNextIndex(currentIndex, total) {
  if (currentIndex === total) {
    return 1;
  }
  return currentIndex + 1;
}

function getPrevIndex(currentIndex, total) {
  if (currentIndex === 1) {
    return total;
  }
  return currentIndex - 1;
}

function showModal() {
  dialog.showModal();
  renderImgUI(modalImgIndex, modalRoot);
}

function renderMainImgUI(currentIndex, root) {
  const wrapper = root.querySelector(".main-image-wrapper");
  wrapper
    .querySelectorAll(".main-image")
    .forEach((img) => img.classList.add("inactive"));

  const target = wrapper.querySelector(`[data-index="${currentIndex}"]`);

  if (!target) return;

  target.classList.remove("inactive");
}

function renderThumbnailEffect(currentIndex, root) {
  const list = root.querySelector(".thumbnail-list");

  list
    .querySelectorAll(".thumb-nail")
    .forEach((img) => img.classList.remove("focused"));

  const target = list.querySelector(`[data-index="${currentIndex}"]`);

  if (!target) return;

  target.classList.add("focused");
}

function renderImgUI(index, root) {
  renderThumbnailEffect(index, root);
  renderMainImgUI(index, root);
}

showDialog.forEach((img) =>
  img.addEventListener("click", () => {
    modalImgIndex = mainImgIndex;

    showModal();
  })
);

closeDialog.addEventListener("click", () => {
  dialog.close();
});

prevBtn.addEventListener("click", () => {
  modalImgIndex = getPrevIndex(modalImgIndex, totalImgNum);

  renderImgUI(modalImgIndex, modalRoot);
});

nextBtn.addEventListener("click", () => {
  modalImgIndex = getNextIndex(modalImgIndex, totalImgNum);

  renderImgUI(modalImgIndex, modalRoot);
});

const modalThumbnail = modalRoot.querySelectorAll(".thumb-nail");
modalThumbnail.forEach((t) =>
  t.addEventListener("click", () => {
    modalImgIndex = +t.dataset.index;

    renderImgUI(modalImgIndex, modalRoot);
  })
);

const mainThumbnail = mainRoot.querySelectorAll(".thumb-nail");
mainThumbnail.forEach((t) =>
  t.addEventListener("click", () => {
    mainImgIndex = +t.dataset.index;

    renderImgUI(mainImgIndex, mainRoot);
  })
);

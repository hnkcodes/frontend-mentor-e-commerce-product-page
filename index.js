let itemNumber = 0;
let cartNumber = 0;
let currentIndex = 1;
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

function setupGallery(root) {
  const thumbNails = root.querySelectorAll(".thumb-nail");
  const mainImageWrapper = root.querySelector(".main-image-wrapper");

  thumbNails.forEach((thumbNail) =>
    thumbNail.addEventListener("click", (e) => {
      thumbNails.forEach((t) => t.classList.remove("focused"));
      thumbNail.classList.add("focused");

      const imageId = e.target.id;
      const target = mainImageWrapper.querySelector(
        `[data-img-id="${imageId}"]`
      );

      mainImageWrapper
        .querySelectorAll(".main-image")
        .forEach((img) => img.classList.add("inactive"));
      target.classList.remove("inactive");
    })
  );
}

function toggleMainImage(root, targetId) {
  const target = root
    .querySelector(".main-image-wrapper")
    .querySelector(targetId);

  root
    .querySelector(".main-image-wrapper")
    .querySelectorAll(".main-image")
    .forEach((img) => img.classList.add("inactive"));
  target.classList.remove("inactive");
}

function toggleThumbnailFocus(root, targetId) {
  const thumbNailTarget = root
    .querySelector(".thumbnail-list")
    .querySelector(targetId);

  root
    .querySelectorAll(".thumb-nail")
    .forEach((t) => t.classList.remove("focused"));
  thumbNailTarget.classList.add("focused");
}

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

  console.log(itemNumber);
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

setupGallery(mainRoot);
setupGallery(modalRoot);

showDialog.forEach((img) =>
  img.addEventListener("click", (e) => {
    dialog.showModal();

    const imageId = e.target.dataset.imgId;

    toggleThumbnailFocus(modalRoot, `#${imageId}`);
    toggleMainImage(modalRoot, `[data-img-id="${imageId}"]`);
  })
);

closeDialog.addEventListener("click", () => dialog.close());

nextBtn.addEventListener("click", () => {
  currentIndex = getNextIndex(currentIndex, totalImgNum);

  toggleMainImage(modalRoot, `[data-img-id="product-${currentIndex}"]`);
  toggleThumbnailFocus(modalRoot, `#product-${currentIndex}`);
});

prevBtn.addEventListener("click", () => {
  currentIndex = getPrevIndex(currentIndex, totalImgNum);

  toggleMainImage(modalRoot, `[data-img-id="product-${currentIndex}"]`);
  toggleThumbnailFocus(modalRoot, `#product-${currentIndex}`);
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

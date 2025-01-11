import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.id;
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
    <div class="order__item js-order-item-${matchingProduct.id}" >
            <div class="order__container-img">
              <img
                class="order__item-img"
                src="${matchingProduct.image}"
                alt=""
              />
            </div>

            <div class="order__item-text">
              <p>${matchingProduct.name}</p>
              <p>Цена: ${matchingProduct.price} ₽</p>
              <p>Количество: ${cartItem.quantity}</p>
              <div class="order__item-btns">
                <button class="delete-btn" data-product-id="${matchingProduct.id}" >Удалить</button>
                <button>Добавить</button>
              </div>
            </div>
          </div>
    `;
});

document.querySelector('.order__items').innerHTML = cartSummaryHTML;

document.querySelectorAll('.delete-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const productId = btn.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(`.js-order-item-${productId}`);
    container.remove();
  });
});

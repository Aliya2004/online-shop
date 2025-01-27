import { products } from '../data/products.js';
import { cart, saveToStorage } from '../data/cart.js';

let productsHTML = '';

displayProducts(products);

function displayProducts(menuItems) {
  menuItems.forEach((product) => {
    let { id, image, name, stars, reviews, price } = product;
    productsHTML += `
      <div class="product__card" >
            <div class="product__card__item">
              <img
                src="${image}"
                alt=""
                class="product__card-photo"
              />
            </div>
  
            <div class="product__card-text">
              <p class="product__card-p">${name}</p>
              <div class="reviews">
                <img src="images/star.png" alt="" class="product__card-img" />
                <p>${(stars / 10).toFixed(1)}</p>
                <p class="product__card-feedbacks">${reviews}</p>
              </div>
              <p class="product__card-price">${price} ₽</p>
              <button class = "product__card-btn" data-product-id="${id}">Добавить в корзину</button>
            </div>
          </div>
      `;
  });

  document.querySelector('.products__container').innerHTML = productsHTML;
}

document.querySelectorAll('.product__card-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const productId = btn.dataset.productId;
    let matchingItem;

    cart.forEach((item) => {
      if (productId === item.id) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        quantity: 1,
      });

      saveToStorage();
    }

    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.cart-quantity').textContent = cartQuantity;

    console.log(cart);
  });
});

export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    id: 'first',
    quantity: 1,
  },
  {
    id: 'second',
    quantity: 1,
  },
];

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(id) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (id !== cartItem.id) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveToStorage();
}

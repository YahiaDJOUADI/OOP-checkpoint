const cartItemsElement = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

const addToCartButtons = [
  document.getElementById("add-to-cart-1"),
  document.getElementById("add-to-cart-2"),
  document.getElementById("add-to-cart-3"),
];
const removeFromCartButtons = [
  document.getElementById("remove-from-cart-1"),
  document.getElementById("remove-from-cart-2"),
  document.getElementById("remove-from-cart-3"),
];

// Product Class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class ShoppingCartItem {
  constructor(product) {
    this.product = product;
    this.quantity = 1;
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product) {
    const existingItem = this.items.find(
      (item) => item.product.id == product.id
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push(new ShoppingCartItem(product));
    }
    this.renderCart();
  }

  removeItem(productId) {
    const existingItem = this.items.find(
      (item) => item.product.id == productId
    );
    if (existingItem) {
      existingItem.quantity--;
      if (existingItem.quantity == 0) {
        this.items = this.items.filter((item) => item.product.id !== productId);
      }
    }
    this.renderCart();
  }
  renderCart() {
    cartItemsElement.innerHTML = "";
    let totalPrice = 0;
// Mr instructor i google it here how to create a element of html in java script
    this.items.forEach((item) => {
      totalPrice += item.getTotalPrice();
      const cartItemElement = document.createElement("div");
      cartItemElement.innerHTML = `
        <div>${item.product.name} (x${item.quantity}) - $${item
        .getTotalPrice()
        .toFixed(2)}</div>
      `;
      cartItemsElement.appendChild(cartItemElement);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
  }
}
const products = [
  new Product(1, "Samsung Galaxy 360 Book 2 Pro", 1500),
  new Product(2, "iPhone 13 Pro Max", 950),
  new Product(3, "Xbox Series S", 399),
];

const cart = new ShoppingCart();
addToCartButtons.forEach((button, index) => {
  button.onclick = () => {
    cart.addItem(products[index]);
  };
});

removeFromCartButtons.forEach((button, index) => {
  button.onclick = () => {
    cart.removeItem(products[index].id);
  };
});

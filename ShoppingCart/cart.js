const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTax = document.getElementById("cart-tax");

// this is for shopping cart for localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the shopping cart display on the shopping cart page
function updateCartDisplay() {
  cartItems.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement("tr");
    cartItem.classList.add("cart-item");

    // Calculate the item total price with tax (.25%)
    const itemTotal = item.rating * item.quantity;
    const itemTax = 0.25 * itemTotal; // total price plus tax
    //  <td>$${itemTotal.toFixed(2)}</td>
    const itemPriceWithTax = itemTotal + itemTax;

    subtotal += itemPriceWithTax;

    cartItem.innerHTML = `
    <td><div class="bookItem">
    <img class="displayphotoes" src=${item.image_url} alt="img"/>
    <h4 class="titleText" >${item.title} </h4>
    <div></td>
       <td><p>$ ${item.rating}</p></td>
       <td> <button class="reduce-quantity" data-id="${item.id}">-</button>
       <span class="quantity">${item.quantity}</span>
       <button class="add-quantity" data-id="${item.id}">+</button></td>

      <td>$${itemTax.toFixed(2)}</td>
      <td>$${itemPriceWithTax.toFixed(2)}</td>
       <td> <button class="remove-item" data-id="${
         item.id
       }">Remove</button></td>
      </div>
    `;

    const reduceButton = cartItem.querySelector(".reduce-quantity");
    reduceButton.addEventListener("click", () => reduceQuantity(item));

    const addButton = cartItem.querySelector(".add-quantity");
    addButton.addEventListener("click", () => addQuantity(item));

    const removeButton = cartItem.querySelector(".remove-item");
    removeButton.addEventListener("click", () => removeItem(item));

    cartItems.appendChild(cartItem);
  });

  // Calculate the sub total only books total price (no taxes)
  const total = cart.reduce(
    (acc, item) => acc + item.rating * item.quantity,
    0
  );
  cartTotal.textContent = `Subtotal: $${total.toFixed(2)}`;

  // Display the subtotal, tax, and total price
  cartSubtotal.textContent = `Total: $${subtotal.toFixed(2)}`; // total price includes Taxes
  const tax = 0.05 * subtotal;
  cartTax.textContent = `$${tax.toFixed(2)}`;
  const total2 = subtotal + tax;
  cartTotal.textContent = `$${total2.toFixed(2)}`;
}

// Function to reduce item quantity
function reduceQuantity(item) {
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

  if (itemIndex !== -1 && cart[itemIndex].quantity > 1) {
    cart[itemIndex].quantity--;
    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Update the shopping cart display
    updateCartDisplay();
  }
}

// Function to add item quantity
function addQuantity(item) {
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity++;
    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Update the shopping cart display
    updateCartDisplay();
  }
}

// Function to remove an item from the shopping cart
function removeItem(item) {
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Update the shopping cart display
    updateCartDisplay();
  }
}

// Update the shopping cart display on the shopping cart page
updateCartDisplay();

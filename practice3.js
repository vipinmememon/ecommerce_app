document.addEventListener("DOMContentLoaded", () => {
    const products = [
      { id: 1, name: "Product 1", price: 29.99 },
      { id: 2, name: "Product 2", price: 19.99 },
      { id: 3, name: "Product 3", price: 59.99 },
    ];
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");
  
    // Render products
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
      `;
      productList.appendChild(productDiv);
    });
  
    // Add to cart
    productList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const productId = parseInt(e.target.getAttribute("data-id"));
        const product = products.find((p) => p.id === productId);
        addToCart(product);
      }
    });
  
    function addToCart(product) {
      cart.push(product);
      saveCart();
      renderCart();
    }
  
    // Render cart
    function renderCart() {
      cartItems.innerHTML = "";
      let totalPrice = 0;
  
      if (cart.length > 0) {
        emptyCartMessage.classList.add("hidden");
        cartTotalMessage.classList.remove("hidden");
  
        cart.forEach((item, index) => {
          totalPrice += item.price;
          const cartItem = document.createElement("div");
          cartItem.classList.add("product");
          cartItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button data-id="${item.id}">Remove</button>
          `;
          cartItems.appendChild(cartItem);
        });
  
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
      } else {
        emptyCartMessage.classList.remove("hidden");
        cartTotalMessage.classList.add("hidden");
        totalPriceDisplay.textContent = `$0.00`;
      }
    }
  
    // Remove single item
    cartItems.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const removeBtnId = parseInt(e.target.getAttribute("data-id"));
        const indexToremove=cart.findIndex((item) => item.id === removeBtnId); //findex return index of element;
        if(indexToremove!==-1){
            cart.splice(indexToremove,1); //remove only the first matching item
        }
        saveCart();
        renderCart();
      }
    });
  
    // Checkout button
    checkOutBtn.addEventListener("click", () => {
      cart = [];
      saveCart();
      alert("Checkout successful!");
      renderCart();
    });
  
    // Save cart to localStorage
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    // Load cart on page load
    renderCart();
  });
  
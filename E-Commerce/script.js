document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("addTaskButton");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
  
    // Function to add a favorite item
    function addFavorite() {
      const favoriteName = taskInput.value.trim();
      if (favoriteName) {
        const listItem = document.createElement("li");
        listItem.textContent = favoriteName;
  
        // Create remove button for each item
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";
  
        // Remove item when 'Remove' button is clicked
        removeButton.addEventListener("click", () => {
          taskList.removeChild(listItem);
        });
  
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        taskInput.value = "";  // Clear input after adding
      } else {
        alert("Please enter a collection name to add it to favorites.");
      }
    }
  
    // Event listener for 'Add to Favorites' button
    addButton.addEventListener("click", addFavorite);
  
    // Optional: Allow pressing "Enter" to add a favorite
    taskInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        addFavorite();
      }
    });
  });

 // Add to the cart section
 document.addEventListener("DOMContentLoaded", () => {
    const products = [
        // Ladies Section
        { id: 1, name: "Sammer Haze", price: "€2,600.00", image: "w1.jpg", description: "Elegant outfit for ladies.", category: "Ladies" },
        { id: 2, name: "Autumn Breez", price: "€4,400.00", image: "w2.jpg", description: "Elegant outfit for ladies.", category: "Ladies" },
        { id: 3, name: "Night Angel", price: "€1,350.00", image: "w4.jpg", description: "Elegant outfit for ladies.", category: "Ladies" },
        
        // Gentlemen Section
        { id: 4, name: "Dream Boat", price: "€620.00", image: "m0.jpg", description: "Elegant outfit for gentlemen.", category: "Gentlemen" },
        { id: 5, name: "Sunshine", price: "€1,110.00", image: "m7.jpg", description: "Elegant outfit for gentlemen.", category: "Gentlemen" },
        { id: 6, name: "Prince Charming", price: "€950.00", image: "m8.jpg", description: "Elegant outfit for gentlemen.", category: "Gentlemen" },
        
        // Watches Section
        { id: 7, name: "Rolex Set", price: "€32,500.00", image: "rox.jpg", description: "Luxury matching watches.", category: "Watches" },
        { id: 8, name: "Vacheron Constantin Set", price: "€58,000.00", image: "vach.jpg", description: "Luxury matching watches.", category: "Watches" },
        { id: 9, name: "Cartier Set", price: "€11,000.00", image: "carti.jpg", description: "Luxury matching watches.", category: "Watches" }
    ];

    let cart = []; // Array to hold cart items
    const productContainer = document.querySelector(".product-grid");
    const cartIcon = document.querySelector(".cart");
    const modal = document.getElementById("modalCart");
    const cartDisplay = document.querySelector(".modal-cart-content");

    // Render products by category
    function renderProducts() {
        const categories = [...new Set(products.map(product => product.category))];
        productContainer.innerHTML = categories.map(category => `
            <h2>${category}</h2>
            <div class="products">
                ${products
                    .filter(product => product.category === category)
                    .map(product => `
                        <div class="product">
                            <img src="${product.image}" alt="${product.name}" />
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p>${product.price}</p>
                            <button class="btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                        </div>
                    `).join('')}
            </div>
        `).join('');
    }

    // Add product to cart
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product); // Add product to cart array
            updateCartDisplay();
            displayConfirmation(product.name);
        }
    }

    // Remove product from cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId); // Remove item by filtering out the product ID
        updateCartDisplay(); // Update the cart display
    }

    // Update the cart display in the modal
    function updateCartDisplay() {
        if (cart.length === 0) {
            cartDisplay.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cartDisplay.innerHTML = `
                <h1>Cart</h1>
                <ul>
                    ${cart.map(item => `
                        <li>
                            ${item.name} - ${item.price}
                            <button class="remove-item-btn" data-id="${item.id}">Remove</button>
                        </li>
                    `).join('')}
                </ul>
                <button class="btn close-cart-btn">Close Cart</button>
            `;

            // Attach event listeners to each "Remove" button
            document.querySelectorAll(".remove-item-btn").forEach(button => {
                button.addEventListener("click", (event) => {
                    const productId = parseInt(event.target.dataset.id);
                    removeFromCart(productId);
                });
            });

            // Attach event listener to the "Close Cart" button
            document.querySelector(".close-cart-btn").addEventListener("click", closeCart);
        }
    }

    // Show a confirmation message
    function displayConfirmation(productName) {
        const confirmation = document.createElement("div");
        confirmation.className = "confirmation-message";
        confirmation.textContent = `${productName} has been added to the cart.`;
        document.body.appendChild(confirmation);
        setTimeout(() => confirmation.remove(), 3000);
    }

    // Open the cart modal
    function openCart() {
        modal.style.display = "block";
        setTimeout(() => modal.classList.add("show"), 10);
    }

    // Close the cart modal without clearing items
    function closeCart() {
        modal.classList.remove("show");
        setTimeout(() => modal.style.display = "none", 300);
    }

    // Event listeners
    cartIcon.addEventListener("click", openCart);
    productContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart-btn")) {
            const productId = parseInt(event.target.dataset.id);
            addToCart(productId);
        }
    });

    renderProducts(); // Initial rendering of products
});

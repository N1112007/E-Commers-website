const products = [
    { id: 1, name: "Smartphone", price: 999, image: "images/Smartphone.jpg" },
    { id: 2, name: "Pro Laptop", price: 1999, image: "images/laptop.avif" },
    { id: 3, name: "Smart Watch", price: 299, image: "images/watch.jpg" },
    { id: 4, name: "Wireless Headphones", price: 199, image: "images/Headphone.jpg" },
    { id: 5, name: "Noise Cancelling Earbuds", price: 149, image: "images/earbuds.jpg" },
    { id: 6, name: "4K Ultra HD TV", price: 799, image: "images/tv.jpg" },
    { id: 7, name: "Gaming Console", price: 499, image: "images/console.jpg" },
    { id: 8, name: "Mechanical Keyboard", price: 129, image: "images/keyboard.jpg" },
    { id: 9, name: "Ergonomic Office Chair", price: 349, image: "images/chair.jpg" },
    { id: 10, name: "Modern Fabric Sofa", price: 899, image: "images/sofa.jpg" },
    { id: 11, name: "Wooden Coffee Table", price: 249, image: "images/table.jpg" },
    { id: 12, name: "Smart Air Purifier", price: 179, image: "images/purifier.jpg" },
    { id: 13, name: "Robot Vacuum Cleaner", price: 399, image: "images/vacuum.jpg" },
    { id: 14, name: "Digital Espresso Machine", price: 599, image: "images/espresso.jpg" },
    { id: 15, name: "Electric Air Fryer", price: 119, image: "images/fryer.jpg" },
    { id: 16, name: "Smart Refrigerator", price: 2499, image: "images/fridge.jpg" },
    { id: 17, name: "Fitness Tracker", price: 89, image: "images/tracker.jpg" },
    { id: 18, name: "Bluetooth Home Speaker", price: 229, image: "images/speaker.jpg" }
];

// --- PURE DOM & TEXT CART LOGIC (NO JSON) ---

// Reads the cart as a simple string of text (e.g. "1,2,2,5")
function getCartString() {
    return localStorage.getItem('simpleCartText') || "";
}

window.addToCart = function(productId) {
    let currentCart = getCartString();
    
    if (currentCart === "") {
        // If cart is empty, just save the ID
        localStorage.setItem('simpleCartText', productId.toString());
    } else {
        // If cart has items, add a comma and the new ID
        localStorage.setItem('simpleCartText', currentCart + "," + productId);
    }
    
    updateCartUI();
};

window.changeQty = function(productId, delta) {
    let currentCart = getCartString();
    if (!currentCart) return;

    // Convert our string into an array of texts ["1", "2", "2"]
    let items = currentCart.split(',');
    let idString = productId.toString();

    if (delta === 1) {
        // Add one more of this ID to the array
        items.push(idString);
    } else if (delta === -1) {
        // Find the first instance of this ID and remove it
        const index = items.indexOf(idString);
        if (index > -1) {
            items.splice(index, 1);
        }
    }

    // Join the array back into a text string and save it
    localStorage.setItem('simpleCartText', items.join(','));
    updateCartUI();
};

window.updateCartUI = function() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItemsContainer) return; // Safety check if drawer isn't on the page

    let currentCart = getCartString();
    let items = currentCart ? currentCart.split(',') : [];

    // Count how many times each ID appears in the array
    let itemCounts = {};
    for (let i = 0; i < items.length; i++) {
        let id = items[i];
        itemCounts[id] = (itemCounts[id] || 0) + 1;
    }

    let total = 0;
    cartItemsContainer.innerHTML = ''; // Clear existing DOM

    // Build the DOM using standard HTML injection
    for (let id in itemCounts) {
        let qty = itemCounts[id];
        let product = products.find(p => p.id == id);
        
        if (product) {
            total += product.price * qty;

            cartItemsContainer.innerHTML += `
                <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                    <div class="d-flex align-items-center">
                        <img src="${product.image}" style="width: 50px; height: 50px; object-fit: cover;" class="me-2 rounded">
                        <div>
                            <h6 class="mb-0 text-truncate" style="max-width: 120px;">${product.name}</h6>
                            <small class="text-success fw-bold">$${product.price}</small>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-danger px-2 py-0" onclick="changeQty(${product.id}, -1)">-</button>
                        <span class="mx-2 fw-bold">${qty}</span>
                        <button class="btn btn-sm btn-outline-success px-2 py-0" onclick="changeQty(${product.id}, 1)">+</button>
                    </div>
                </div>
            `;
        }
    }

    // Update the numbers in the DOM
    if(cartCount) cartCount.innerText = items.length;
    if(cartTotal) cartTotal.innerText = total.toFixed(2);
};

// Run this when the page loads so the drawer reflects what is saved
document.addEventListener("DOMContentLoaded", updateCartUI);
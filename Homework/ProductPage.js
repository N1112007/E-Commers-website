const container = document.getElementById('product-container');
const searchInput = document.getElementById('searchInput');
const sortHighLowBtn = document.getElementById('sortHighLow');
const sortLowHighBtn = document.getElementById('sortLowHigh');

// 1. Wrap your existing HTML generation in a function
function renderProducts(productsToRender) {
    // Clear the container first so we don't just keep adding to the bottom
    container.innerHTML = ''; 
    
    productsToRender.forEach(product => {
        const cardHTML = `
        <div class="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
            <div class="card h-100 w-100 d-flex flex-column" style="max-width: 320px;">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 180px; object-fit: cover; width: 100%;"/>
                <div class="card-body d-flex flex-column" style="padding: 15px;">
                    <h5 class="card-title" style="margin: 0 0 10px 0; font-size: 1.25rem;">${product.name}</h5>
                    <p class="card-text mb-3" style="color: #28a745; font-weight: bold; font-size: 1.1rem;">
                        $${product.price}
                    </p>
                    <button class="btn btn-primary w-100 mt-auto rounded-pill" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// 2. Initial render of all products when the page loads
renderProducts(products);

// 3. Search functionality using 'keyup'
searchInput.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    // Filter the array based on what the user typed
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    renderProducts(filteredProducts);
});

// 4. Sort Top-Bottom (Highest to Lowest Price) using 'click'
sortHighLowBtn.addEventListener('click', () => {
    // Create a copy of the array and sort it descending
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    renderProducts(sortedProducts);
});

// 5. Sort Bottom-Top (Lowest to Highest Price) using 'click'
sortLowHighBtn.addEventListener('click', () => {
    // Create a copy of the array and sort it ascending
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    renderProducts(sortedProducts);
});
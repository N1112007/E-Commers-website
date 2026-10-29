const container = document.getElementById('product-container');

products.forEach(product => {
    if(product.id > 5) return;

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

// The 6th redirect card, also wrapped in Bootstrap columns
const seeMoreCard = `
    <div class="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
        <div class="card h-100 w-100 d-flex justify-content-center align-items-center text-center" 
             style="max-width: 320px; background-color: #e9ecef; cursor: pointer;"
             onclick="window.location.href='ProductPage.html'">
            <div class="card-body d-flex flex-column justify-content-center">
                <h3 style="color: #0d6efd; font-weight: bold;">Browse More</h3>
                <p class="text-muted">Explore all our products</p>
                <h1 style="color: #0d6efd;">➔</h1>
            </div>
        </div>
    </div>
`;

container.insertAdjacentHTML('beforeend', seeMoreCard);
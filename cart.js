document.addEventListener("DOMContentLoaded", function() {
    const cartItemsWrapper = document.getElementById('cart-items-wrapper');
    const clearCartButton = document.getElementById('clear-cart');
    const totalAmountElement = document.getElementById('total-amount');

function addItemToCart(title, price, image, quantity) {
    const itemHTML = `
        <div class="col-md-6">
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${image}" class="img-fluid rounded-start" alt="${title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">Price: ${price}</p>
                            <p class="card-text">Quantity: ${quantity}</p>
                            <p class="card-text">Total Price: ₱${(parseFloat(price.replace(/[^\d.]/g, '')) * quantity).toFixed(2)}</p>
                            <div class="input-group">
                                <label for="quantity">Adjust Quantity:</label>
                                <input type="number" class="form-control item-quantity" value="${quantity}" min="1">
                                <button class="btn btn-danger remove-from-cart">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    cartItemsWrapper.innerHTML += itemHTML;
}

    function clearCart() {
        cartItemsWrapper.innerHTML = '';
        localStorage.removeItem('cartItems');
        updateTotalAmount();
    }

function updateTotalAmount() {
    const cartItems = document.querySelectorAll('.card.mb-3');
    let totalAmount = 0;
    cartItems.forEach(cartItem => {
        const priceText = cartItem.querySelector('.card-body .card-text').textContent;
        const price = parseFloat(priceText.match(/[0-9.]+/)[0]); // Extract numerical part
        const quantityElement = cartItem.querySelector('.item-quantity');
        if (!isNaN(price) && quantityElement) { // Check if price is valid and quantity element exists
            const quantity = parseInt(quantityElement.value);
            totalAmount += price * quantity;
        }
    });
    totalAmountElement.textContent = `Total: ₱${totalAmount.toFixed(2)}`;
}

    cartItemsWrapper.addEventListener('change', function(event) {
        if (event.target.classList.contains('item-quantity')) {
            updateTotalAmount();
        }
    });

    cartItemsWrapper.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            event.target.closest('.card.mb-3').remove();
            updateTotalAmount();
            saveCartItems();
        }
    });

    clearCartButton.addEventListener('click', function() {
        clearCart();
    });

    function saveCartItems() {
        const cartItems = Array.from(cartItemsWrapper.querySelectorAll('.card.mb-3')).map(item => {
            const title = item.querySelector('.card-body .card-title').textContent;
            const price = item.querySelector('.card-body .card-text').textContent;
            const image = item.querySelector('.card-img-top').src;
            const quantity = parseInt(item.querySelector('.item-quantity').value);
            return { name: title, price, imageUrl: image, quantity }; // Use name and imageUrl properties
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

function loadCartItems() {
    const savedItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedItems) {
        savedItems.forEach(item => {
            addItemToCart(item.name, item.price, item.imageUrl, item.quantity); // Use name and imageUrl properties
        });
        updateTotalAmount();
    }
}

    loadCartItems();
});

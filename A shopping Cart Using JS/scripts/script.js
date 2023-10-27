//UI variables
let productAdd = document.querySelectorAll('.add');
let cart = document.querySelector('#cart');

//event listener for addition to cart
productAdd.forEach(el => {
    el.addEventListener('click', addToCart);
})

//functions
// addToCart function
function addToCart(e) {
    let productName = e.target.parentElement.parentElement.children[0].textContent;
    let productPrice = parseInt(e.target.parentElement.parentElement.children[1].textContent);
    let quantity = 1;
    let productId = e.target.classList[1];
    if(cart.innerHTML == "") {
        cart.innerHTML = `
        <h3>Cart:</h3>
        <table id="cart-table">
            <thead>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
            </thead>
            <tr>
                <td>${productName}</td>
                <td>${quantity}</td>
                <td>${productPrice}</td>
                <td><button class="remove ${productId}">Remove</td>
            </tr>
        </table>
        `
    }
    else {
        let item = `
        <tr>
            <td>${productName}</td>
            <td>${quantity}</td>
            <td>${productPrice}</td>
            <td><button class="remove ${productId}">Remove</td>
        </tr>
        `
        let cartTable = document.getElementById('cart-table');
        cartTable.innerHTML += item;

    }
    showTotalPrice(productPrice, '+');
    disableAddToCartBtn(e.target);
    listenForRemoval();
}

function showTotalPrice(price, op) { 
    if (document.getElementById('product-price') === null) {
        let p = document.createElement('p');
        p.id = "product-price";
        p.appendChild(document.createTextNode(`Total Price: ${price}`));
        cart.appendChild(p);
    }
    else {
        let p = document.getElementById('product-price');
        let arr = p.textContent.trim().split(" ");
        let existingTotal = parseInt(arr[2]);
        if(op == '+') {
            p.textContent = `Total Price: ${(existingTotal+price).toString()}`;
        }
        else {
            p.textContent = `Total Price: ${(existingTotal-price).toString()}`;
        }

    }
}

function disableAddToCartBtn(el) {
    el.setAttribute("disabled", "");
}

function listenForRemoval() {
    let productRemove = document.querySelectorAll(".remove");
    productRemove.forEach(el => {
        el.addEventListener('click', removeFromCart);
    })
}

function removeFromCart(e) {
    let table = document.getElementById("cart-table");
    let tableRows = table.rows.length;
    let productId = e.target.classList[1];
    let addEle = document.querySelector(`.add.${productId}`);
    if(tableRows == 2) {
        cart.innerHTML = "";
    }
    else {
        let price = parseInt(e.target.parentElement.previousElementSibling.textContent);
        e.target.parentElement.parentElement.remove();
        showTotalPrice(price, '-');
    }
    enableAddToCartBtn(addEle);
}

function enableAddToCartBtn(el) {
    el.removeAttribute("disabled");
}

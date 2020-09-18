const ready = () => {
    // const removeCartItemButtons = document.querySelectorAll('.btn-delete')
    // for(let i = 0; i < removeCartItemButtons.length; i++){
    //     const buttonRemove = removeCartItemButtons[i]
    //     buttonRemove.addEventListener('click', removeItemcart)
    // }

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn')
    for(let i = 0; i < addToCartButtons.length; i++){
        const button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    const purchaseButton = document.querySelector(".btn-purchase");
    purchaseButton.addEventListener('click', buttonPurchaseClicked)
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

const addToCartClicked = event => {
    const button    = event.target
    const shopItem  = button.parentElement.parentElement
    const title     = shopItem.querySelectorAll('.item-title')[0].innerText
    const price     = shopItem.querySelectorAll('.item-price')[0].innerText
    const imageSrc  = shopItem.querySelectorAll('.item-image')[0].src 

    event.preventDefault()

    addItemToCart(title, price, imageSrc);
    updateCartTotal()
}

const addItemToCart = (title, price, imageSrc) => {
    alertCart()

    let cartRow          = document.createElement('tr');
    cartRow.classList.add('cart-row');
    let cartItems        = document.querySelectorAll('.cart-items')[0];
    let cartItemNames    = cartItems.querySelectorAll('.item-title');
    for(let i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title){
            alert('Produk yang Anda pilih sudah ada di keranjang!')
            return;
        }
    };

    // for (i = 0; i < cartItemNames.length; i++) {
    //   if (cartItemNames[i].innerText == title) {
    //     alert("Produk yang Anda pilih sudah ada di keranjang!");
    //     return;
    //   }
    // }

    cartRowContents = `<td class="cart-item cart-column">
            <img src="${imageSrc}" alt="" class="cart-item-image" width="30" height="30">
        </td>
        <td>
            <span class="item-title">${title}</span>
        </td>
        <td>
            <span class="cart-price cart-column">${price}</span>
        </td>
        <td class="cart-quantity cart-column">
            <input type="number" value="1" min="1" class="cart-quantity-input input-qty">
        </td>
        <td>        
            <button class="btn btn-danger btn-sm btn-delete" type="button">Remove</button>
        </td>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.querySelectorAll('.btn-danger')[0].addEventListener('click', removeItemcart);
    cartRow.querySelectorAll('.cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

const updateCartTotal = () => {
    let cartItemContainer   = document.querySelectorAll('.cart-items')[0]
    let cartRows            = cartItemContainer.querySelectorAll('.cart-row')
    let total = 0 
    for(let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.querySelectorAll('.cart-price')[0]
        let quantityElement = cartRow.querySelectorAll('.cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('Rp.', ''))
        let quantity = quantityElement.value
        total += (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.querySelectorAll('.cart-total-price')[0].innerText = `Rp. ${total}`
}

const removeItemcart = event => {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

// Tampilkan tulisan keranjang kosong ketika tidak ada satu pun barang di keranjang
const alertCart = () => {
    if (addToCartClicked) {
      const alerCartElement = document.querySelector(".alert-cart");
      const table = document.querySelector(".table");

      alerCartElement.style.display = "none";
      table.style.display = "block";
    }
}

const quantityChanged = event => {
    const input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

const buttonPurchaseClicked = () => {
    alert('Data belanja anda sudah kami simpan')
    let cartItems = document.querySelector('.cart-items')
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}
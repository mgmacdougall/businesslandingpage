
var updateCart = () => {


}

var displayOrderButton = e => {
    console.log(e.target.id.split('-').shift());
    var baseId=e.target.id.split('-').shift();

    var orderButton = document.getElementById(`${baseId}-button`);
    orderButton.classList.toggle('hidden');

    var addOrderButton = document.getElementById(`${baseId}-button-order`);
    addOrderButton.classList.toggle('hidden')
}



var addToCartEventListener = (e) => {
    var itemClicked = e.target.id.split('-')[0];
    var categorySelector = `${itemClicked}-cat`;
    var nameSelector = `${itemClicked}-name`;
    var priceSelector = `${itemClicked}-price`;
    var categoryText = document.getElementById(categorySelector).innerText;
    var nameText = document.getElementById(nameSelector).innerText;
    var priceText = document.getElementById(priceSelector).innerText;
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener('click', e => {
        if (e.target.type === "submit") {
            displayOrderButton(e);
            addToCartEventListener(e);
        }
    })
})

var render = (data) => {
    data.forEach(element => {
        const { name, image, price } = element;
        var container = document.getElementById('meal-items-container');
        const { desktop } = image;
        const itemName = name.replace(/[","," "]/g, '').toLowerCase();
        var mealCard = `
        <div id="${itemName}" class="meal-card">
        <div class="meal-details">
        <div class="img-container">
        <img class="meal-image" src="${desktop}" alt="Image of waffle">
        <button id="${name.replace(/[","," "]/g, '').toLowerCase()}-button" class="red-hat-text-400"><img src="/assets/images/icon-add-to-cart.svg" /><span>Add to card</span></button>
        <button id="${name.replace(/[","," "]/g, '').toLowerCase()}-button-order" class="red-hat-text-400 order-quantity-button hidden"><img id="${name.replace(/[","," "]/g, '').toLowerCase()}-remove-item" src="/assets/images/icon-decrement-quantity.svg"/><span>0</span><img id="${name.replace(/[","," "]/g, '').toLowerCase()}-add-item" src="/assets/images/icon-increment-quantity.svg"></button>
        </div>
        <div>
        <ul class="meal-info">
        <li id="${itemName}-cat" class="meal-list-item li-none font-weight-light font-color-gray red-hat-text-200">${name.split(' ')[0]}</li>
        <li id="${itemName}-name" class="meal-list-item li-none red-hat-text-500">${name}</li>
        <li id="${itemName}-price" class="meal-list-item li-none red">${price}</li>
        </ul>
        </div>
        </div>
        `
        container.innerHTML += mealCard;
    });

}


window.onload = (() => {
    fetch('data.json').then(data => data.json()).then(jsonData => render(jsonData))
})
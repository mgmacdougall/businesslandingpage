var customerOrder = [];

var renderCart = () => {

    var cartContainer = document.getElementById("cartlist");
    var orderListContainer = document.getElementById("orderlist");
    cartContainer.innerHTML = null; // empty out the previous contents


    var result = Object.values(customerOrder.reduce((value, object) => {
        if (value[object.name]) {
            value[object.name].quantity += 1;
        } else {
            value[object.name] = { ...object }
        }
        return value;
    }, {}))

    var total = result.reduce((accu, element) => {
        accu += (element.quantity * parseFloat(element.price));
        return accu;
    }, 0)

    var totalQuantity = result.reduce((acc, element) => {
        acc += element.quantity;
        return acc


    }, 0)

    var list = result.map(item => {
        const { name, price, quantity } = item;
        return `
            <div id="orderlist" class="align-left">
                <p class="red-hat-text-500">${name}</p>
                <span><span class="red font-weight-bold">${quantity}x</span> @ ${price}<span>${quantity * price}</span></span>
                <p>${quantity * price}</p>
            </div>
        `
    });

    // build the list
    list.map(e => {
        cartContainer.innerHTML += e
    })

    // build the total container
    const totalDiv = document.createElement('div');
    const totalSpan = document.createElement('span');
    totalSpan.innerText = "Total is: " + total;
    totalDiv.append(totalSpan);
    cartContainer.appendChild(totalDiv)

    // add your cart header.
    const totalHeaderDiv = document.createElement('div');
    const totalHeaderTitle = document.createElement('h2');
    totalHeaderTitle.classList.add('red');
    totalHeaderTitle.innerHTML = `Your Cart (${totalQuantity})`;
    totalHeaderDiv.append(totalHeaderTitle);
    const orderList = document.getElementById("orderlist");
    orderList.before(totalHeaderDiv);

    // add build confirmation order
    const orderConfirmContainer = document.createElement('div');

    const orderConfirmButton = document.createElement('button');
    orderConfirmButton.classList.add('relative');
    orderConfirmButton.innerText = "Confirm order";
    orderConfirmButton.id = "order-confirm";
    orderConfirmContainer.append(orderConfirmButton)
    cartContainer.append(orderConfirmContainer);
}

var resetCart = () => {
    var cartListContainer = document.getElementById('cartlist');
    cartListContainer.innerHTML = null;
    cartListContainer.innerHTML = `
        <div>
            <h2 class="red">Your Cart (Quantity)</h2>
        </div>
        <div>
            <img src="assets/images/illustration-empty-cart.svg" alt="Slice of cake">
        </div>
        <div>
            <p class="red-hat-text-600 font-weight-bold font-color-gray-med">Your added items will appear here</p>
        </div>
    `
    const confirmationModal = document.getElementById('orderconfirmation-modal');
    confirmationModal.innerHTML=null;
    confirmationModal.classList.toggle('hidden');
    window.location.reload();
}

let orderTotal = 0;
var updateCart = (orderItem, action = "add") => {
    if (action === "add") {
        customerOrder.push(orderItem);
        renderCart(customerOrder)
    } else {
        var itemIndex = customerOrder.findIndex(e => orderItem.name === e.name);
        if (itemIndex !== -1) {
            customerOrder.splice(0, 1);
        }
    }
}

var displayOrderButton = e => {
    var baseId = e.target.id.split('-').shift();

    var orderButton = document.getElementById(`${baseId}-button`);
    orderButton.classList.toggle('hidden');

    var addOrderButton = document.getElementById(`${baseId}-button-order`);
    addOrderButton.classList.toggle('hidden')
}

var addToCartEventListener = (e, action) => {
    var itemClicked = e.target.id.split('-')[0];
    var categorySelector = `${itemClicked}-cat`;
    var nameSelector = `${itemClicked}-name`;
    var priceSelector = `${itemClicked}-price`;
    var categoryText = document.getElementById(categorySelector).innerText;
    var nameText = document.getElementById(nameSelector).innerText;
    var priceText = document.getElementById(priceSelector).innerText;
    var order = {
        name: nameText,
        price: priceText,
        quantity: 1
    }
    updateCart(order, action)
}

const renderSummaryModal = () => {

    var mealContainer = document.getElementById("meals");
    const confirmationModal = document.getElementById('orderconfirmation-modal');
    const mealList = document.getElementById('modal-contents');

    var result = Object.values(customerOrder.reduce((value, object) => {
        if (value[object.name]) {
            value[object.name].quantity += 1;
        } else {
            value[object.name] = { ...object }
        }
        return value;
    }, {}))

    var total = result.reduce((accu, element) => {
        accu += (element.quantity * parseFloat(element.price));
        return accu;
    }, 0)

    var totalQuantity = result.reduce((acc, element) => {
        acc += element.quantity;
        return acc
    }, 0)

    var list = result.map(item => {
        const { name, price, quantity } = item;
        return `
            <div>
                <p class="red-hat-text-500">${name}</p>
                <span><span class="red font-weight-bold">${quantity}x</span> @ ${price}<span>${quantity * price}</span></span>
                <p>${quantity * price}</p>
                <div id="order-confirm-total"></div>
            </div>
        `
    });

    const modalDivOuter = document.createElement('div');
    modalDivOuter.classList.add('modal-contents');
    modalDivOuter.id = "modal-contents-container";

    modalDivOuter.innerHTML += `
    <div>
        <img src="./assets/images/icon-order-confirmed.svg"/>
        <h3>Order confirmed</h3>
    </div>`

    // build the list
    list.map(e => {
        modalDivOuter.innerHTML += e
    })


    const modalDiv = document.querySelector("#modal-contents");
    confirmationModal.classList.toggle('hidden');
    const startOverButtonContainer = document.createElement('div');

    const startOverButton = document.createElement('button');
    startOverButton.id = 'modal-order-button';
    startOverButton.innerText = "Start over";

    modalDivOuter.appendChild(startOverButton);
    modalDiv.append(modalDivOuter);



}

const startOver = () => {
    // set the cart to zero

}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener('click', e => {

        if (e.target.id == "modal-order-button") {
           return resetCart();
        }

        if (e.target.type === "submit" && !e.target.classList.contains('order-quantity-button')) {
            if (e.target.id == "order-confirm") {
                renderSummaryModal(e);
            } else {
                displayOrderButton(e);
            }
        }

        if (e.target.alt === "Remove") {
            var orderCount = document.querySelector(`#${e.target.id}`).nextElementSibling;
            var currentCount = parseInt(orderCount.innerText);
            currentCount <= 0 ? orderCount.innerText = 0 : orderCount.innerText -= 1;
            addToCartEventListener(e, "remove");
        }

        if (e.target.alt === "Add") {
            var orderCount = document.querySelector(`#${e.target.id}`).previousElementSibling;
            var currentCount = parseInt(orderCount.innerText);
            orderCount.innerText = currentCount += 1;
            addToCartEventListener(e, "add");
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
        <button id="${name.replace(/[","," "]/g, '').toLowerCase()}-button-order" class="red-hat-text-400 order-quantity-button hidden">
            <img id="${name.replace(/[","," "]/g, '').toLowerCase()}-remove-item" src="/assets/images/icon-decrement-quantity.svg" alt="Remove"/>
            <span>0</span>
            <img id="${name.replace(/[","," "]/g, '').toLowerCase()}-add-item" src="/assets/images/icon-increment-quantity.svg" alt="Add">
            </button>
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
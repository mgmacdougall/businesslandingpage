var addToCartEventListener = (e)=>
{
    // console.log("clicked", e)
    console.log('clicked')
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.addEventListener('click', e=>{
        if(e.target.type ==="submit"){
            console.log('add item to cart', e.target.id)
        }
    })
})

var render = (data) => {
    data.forEach(element => {
        console.log(element)
        const { name, image, price } = element;
        var container = document.getElementById('meal-items-container');
        const { desktop } = image;
        console.log(desktop)
        var mealCard = `
        <div id="${name.replace(/[","," "]/g, '').toLowerCase()}" class="meal-card">
        <div class="meal-details">
        <div class="img-container">
        <img class="meal-image" src="${desktop}" alt="Image of waffle">
        <button id="${name.replace(/[","," "]/g, '').toLowerCase()}-button" class="red-hat-text-400"><img src="/assets/images/icon-add-to-cart.svg" /><span>Add to card</span></button>
        </div>
        <div>
        <ul class="meal-info">
        <li class="meal-list-item li-none font-weight-light font-color-gray red-hat-text-200">${name.split(' ')[0]}</li>
        <li class="meal-list-item li-none red-hat-text-500">${name}</li>
        <li class="meal-list-item li-none red">${price}</li>
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
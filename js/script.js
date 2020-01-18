//Определение элементов разметки
let goodsList = document.querySelector('.goods-list');

// Массив псевдобазы данных

const dataBase = [
    { title: "Робот-пылесос xiaomi", price: 20000, img: 'https://placehold.it/200x150' },
    { title: "Samsung Galaxy", price: 21500, img: 'https://placehold.it/200x150' },
    { title: "Стиральная машина hotpoint", price: 32000, img: 'https://placehold.it/200x150' },
    { title: "Умные часы apple watch", price: 26000, img: 'https://placehold.it/200x150' }
]


const cardCreation = (arr, container='.goods-list')=>{
    arr.forEach(el => {
        container.innerHTML += `<div class="goods-item">
                                    <img src="${el.img}" alt="${el.title}">
                                    <h3 class="goods-item_title">${el.title}</h3>
                                    <p class="goods-item_price">${el.price} &#8381;</p>
                                    <button class="goods-item_button">Купить</button>
                                </div>`
    });
}

cardCreation(dataBase, goodsList);
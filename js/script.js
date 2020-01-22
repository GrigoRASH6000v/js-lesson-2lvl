class GoodsItem {
    constructor(id, title = 'Без названия', price = 0, img = '') {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `
            <div class="goods-item" data-id="${this.id}">
                <img src="${this.img}" alt="alt">
                <h3 class="goods-item_title">${this.title}</h3>
                <p class="goods-item_price">${this.price}</p>
                <button class="goods-item_button">Добавить</button>
            </div>
        `;
    }
}

class GoodsList {
    constructor(container) {
        this.container = document.querySelector(container);
        this.goods = [];
    }
    initListeners() {
        const buttons = [...this.container.querySelectorAll('.goods-item_button')];
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const goodId = event.target.parentElement.getAttribute('data-id');
                this.addToCart(parseInt(goodId, 10));
            })
        })
    }
    findGood(id) {
        return this.goods.find(good => good.id === id);
    }
    addToCart(goodId) {
        const good = this.findGood(goodId);
        //console.log(good)
        
        cart.addCartItem(good)
        //console.log(cart.goodsCart)
        
        
    }
    fetchGoods() {
        this.goods = [
            {id: 1, title: "Робот-пылесос xiaomi", price: 20000, img: 'https://via.placeholder.com/200x150'},
            {id: 2, title: "Samsung Galaxy", price: 21500, img: 'https://via.placeholder.com/200x150'},
            {id: 3, title: "Стиральная машина hotpoint", price: 32000, img: 'https://via.placeholder.com/200x150'},
            {id: 4, title: "Умные часы apple watch", price: 26000, img: 'https://via.placeholder.com/200x150'},
            {id: 5, title: "Посудомоечная машина bosh", price: 26000, img: 'https://via.placeholder.com/200x150'},
        ]
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id, good.title, good.price, good.img);
            listHtml += goodItem.render();
        });
        this.container.innerHTML = listHtml;
        this.initListeners();
    }
}



const cartItem={
    render(element){
        return `<div class="cart-item" data-id="${element.id}">
                    <img src="${element.img}" alt="alt">
                    <table class="cart-item_information">
                    <caption class="cart-item_title">${element.title}</caption>
                    <tr>
                        <td>Цена</td>
                        <td>Колличество</td>
                        <td>Итого</td>
                    </tr>
                    <tr>
                        <td>${element.price}</td>
                        <td>
                            <button class="quantity-less btn" data-purpose="less btn">&laquo;</button>${element.quantity}<button class="quantity-more btn" data-purpose="more">&raquo;</button></td>
                        <td>${element.price}</td>
                    </tr>
                    </table>
                    <button class="cart-item_delete-btn btn" data-purpose="del">&#10006;</button>
                </div>`
    },
}

const cart={
    container: '.cart',
    goodsCart: [ ],
    checkQuantity(checkItem){
       let result = this.goodsCart.find(el=>el.id==checkItem.id)
       return result
    },
    changeQuantity(checkItem){
        let result = this.goodsCart.find(el=>el.id==checkItem.id)
        result.quantity++
    },
    initListeners(){
        const button = document.querySelectorAll('.btn');
        button.forEach(el=>{
            el.addEventListener('click', (evt)=>{
                return evt.target.dataset.purpose
            })
        })
        
    },
    addCartItem(item){
        if(this.checkQuantity(item)==undefined){
            item.quantity = 1;
            this.goodsCart.push(item)
            this.render(this.goodsCart)
        }else{
            this.changeQuantity(item)
            this.render(this.goodsCart)
        }
    },
    deleteGoods(){
        
        
    },
    render(arrGoods){
        let goodListCart=''
        arrGoods.forEach(el=>{
            goodListCart+=cartItem.render(el);
        })
        document.querySelector(this.container).innerHTML=goodListCart;
        this.initListeners()
    }
}


const list = new GoodsList('.goods-list');
list.fetchGoods();
list.render();
let cartBtn = document.querySelector('.cart-button');
let cart12 = document.querySelector('.cart');
cartBtn.addEventListener('click', ()=>{
    cart12.classList.toggle('visible')
})
class GoodsItem {
    constructor (id, title, price, img){
        this.title = title;
        this.price = price;
        this.id = id;
        this.img = img;
    }
    render(){
        const html = `<div class="goods-item" data-id="${this.id}">
                        <img src="${this.img}" alt="alt">
                        <h3 class="goods-item_title">${this.title}</h3>
                        <p class="goods-item_price">${this.price}</p>
                        <button class="goods-item_button">Добавить</button>
                    </div>`
        return html
    }
}

class GoodsList {
    constructor(container){
        this.goods=[];
        this.container =document.querySelector(container);
    }
    fetchGoods(){
        this.goods = [
            {id: 1, title: "Робот-пылесос xiaomi", price: 20000, img: 'https://via.placeholder.com/200x150'},
            {id: 2, title: "Samsung Galaxy", price: 21500, img: 'https://via.placeholder.com/200x150'},
            {id: 3, title: "Стиральная машина hotpoint", price: 32000, img: 'https://via.placeholder.com/200x150'},
            {id: 4, title: "Умные часы apple watch", price: 26000, img: 'https://via.placeholder.com/200x150'},
            {id: 5, title: "Посудомоечная машина bosh", price: 26000, img: 'https://via.placeholder.com/200x150'}
        ]
    }
    initlistiners(){
        const buttonsList = [...this.container.querySelectorAll('.goods-item_button')] ;
        buttonsList.forEach(el=>{
            el.addEventListener('click', (evt)=>{
                this.addToCart(parseInt(evt.target.parentNode.dataset.id, 10));
            })
        })
    }
    addToCart(id){
        let result =  this.goods.find(el=>el.id===id);
        cart.addToCart(result)
    }
    priceAllItems(){
        let sumValue=0
        this.goods.forEach(el=>{
            sumValue+=el.price
        })
        return sumValue;
    }
    render(){
        let htmlList = '';
        this.goods.forEach(el=>{
             let goodItem = new GoodsItem(el.id, el.title, el.price, el.img);
             htmlList+= goodItem.render()
             
        })
        this.container.innerHTML = htmlList;
        this.initlistiners();
    }
}

class CartGood {
    constructor(itemCart){
        this.id = itemCart.id;
        this.title = itemCart.title;
        this.price = itemCart.price;
        this.img = itemCart.img;
        this.quantity = itemCart.quantity;
    }
    render(){
        return`<div class="cart-item" >
                    <img src=${this.img} alt="${this.title}">
                    <table class="cart-item_information">
                        <caption class="cart-item_title">${this.title}</caption>
                        <tr>
                            <td>Цена</td>
                            <td>Колличество</td>
                            <td>Итого</td>
                        </tr>
                        <tr>
                            <td>${this.price}</td>
                            <td data-id="${this.id}"><button class="quantity-less" data-val='-1'>&laquo;</button>${this.quantity}<button class="quantity-more" data-val='1'>&raquo;</button></td>
                            <td>4000</td>
                        </tr>
                    </table>
                    <button class="cart-item_delete-btn" data-val='0'>&#10006;</button>
                </div>` 
    }
}

class CartList {
    constructor(container){
        this.container = document.querySelector(container);
        this.cartItems = [];
    }
    addToCart(item){
        if(this.checkQuantity(item.id)){
          let result =  this.cartItems.findIndex(el=>el.id==item.id)
          this.cartItems[result].quantity++   
        }else{
            item.quantity=1
            this.cartItems.push(item)
        }
        this.render();
    }
    deleteItems(indexItem){
        this.cartItems.splice(indexItem, 1)
        this.render();
    }

    changeGoodsItem(targetValue){
        let findResult = this.cartItems.findIndex(el => el.id==targetValue.parentNode.dataset.id)
        if(targetValue.dataset.val==0){
            this.deleteItems(findResult)
        }else{
            this.cartItems[findResult].quantity+=parseInt(targetValue.dataset.val, 10)
            this.render();
        }
        
    }
    initListiners(){
         const buttonsList = [...this.container.querySelectorAll('button')] ;
         buttonsList.forEach(el=>{
            el.addEventListener('click', (evt)=>{
                 this.changeGoodsItem(evt.target)
             })
         })
    }

    cartShow(){
        const cartBtn = document.querySelector('.cart-button');
        cartBtn.addEventListener('click', ()=>{
            this.container.classList.toggle('visible')

            
        })
    }

    checkQuantity(goodId){
        return this.cartItems.find(el => el.id==goodId)
    }
    render(){
        let htmlList = '';
        this.cartItems.forEach(el=>{
             let goodItem = new CartGood(el);
             htmlList+= goodItem.render();
        })
        this.container.innerHTML = htmlList;
        this.initListiners();
        
        console.log(this.cartItems)
    }
}

let list = new GoodsList('.goods-list');
list.fetchGoods();
list.priceAllItems();
list.render();
let cart = new CartList ('.cart');
cart.cartShow()


let cartBtn = document.querySelector('.cart-button');
cartBtn.addEventListener('click', ()=>{
    cartBtn.classList.toggle('visible')
})
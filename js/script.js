 const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
 
 
 function makeGetRequest(url){
     return new Promise((resolve, reject)=>{
        let xhr;
        if(window.XMLHttpRequest){
            xhr = new window.XMLHttpRequest();
        }else{
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        };
        xhr.onreadystatechange = function(){ //Ловим момент ответа от сервера
            if(xhr.readyState===4){ // В redystate хранится статус запроса, цифра 4, означает что запрос выполнен
                if(xhr.status!==200){
                    reject(xhr.responseText)
                }
                let body = JSON.parse(xhr.responseText)
                resolve(body) //responseText возвращает строковое значение, содержащее ответ на запрос в виде текста, или null, если запрос был неудачным или еще не был отправлен.
            } 
        };
        xhr.open('GET', url);
        xhr.send();
     })
     
 }

 
 //Конструктор единицы товара
class GoodsItem {
    constructor(id=0, title='Без названия', price=0, img='https://via.placeholder.com/200x150'){
        this.id=id;
        this.title=title;
        this.price=price;
        this.img=img;
    }
    initListeners(){

    }
    render(){
        const html = `<div class="goods-item" data-id="${this.id}">
                        <img src="${this.img}" alt="alt">
                        <h3 class="goods-item_title">${this.title}</h3>
                        <p class="goods-item_price">${this.price}</p>
                        <button class="goods-item_button">Добавить</button>
                    </div>`;
        this.initListeners();
        return html;
    };
};

//Родительский класс
class GoodsList {
    constructor(container){
        this.container = document.querySelector(container);
        this.goods = []; 
    };
    //Метод записывает данные с сервера в массив товаров this.goods
    fetchGoods(){};
    //При клике, метод вызывает метод this.addToCard и передаёт в него найденый по id элемент из массива this.goods
    initListener(){};
    findGood(id){
       return  this.goods.find(el=>el.id_product===id)
    }
    
    //Метод проходит по массиву this.goods, записывает данные в переменную listHtml, отрисовывает данные на экран.
    render(){
        let listHtml = '';
        this.goods.forEach(good=>{
            const goodItem = new GoodsItem (good.id_product, good.product_name, good.price, good.img);
            listHtml+=goodItem.render();
        });
        this.container.innerHTML = listHtml;
        this.initListener();
    };
};

//Класс страницы товаров, наследуется от родительского класса GoodsList
class GoodsPage extends GoodsList{
    addToCard(goodId){
        const good = this.findGood(goodId)
        console.log(good)
    };
    initListener(){
        const buttons = [...this.container.querySelectorAll('.goods-item_button')];
        buttons.forEach((button)=>{
            button.addEventListener('click', (evt)=>{
                this.addToCard(parseInt(evt.target.parentNode.dataset.id, 10))
            });
        });
    };
    async fetchGoods(){
        try{
            this.goods = await makeGetRequest(`${API_URL}/catalogData.json`); //await означает: дождаться выполнения промиса
        }catch(e){
            console.error(`Ошибка ${e}`);
        }
    };
};

class CartItem extends GoodsItem{
        constructor(...attrs){ //Собираем все элементы родительского конструктора
            super(attrs); //Передаём все элементы в новый конструктор
            this.count=0
        }
        incCount(){};
        decCount(){};
};

class Cart extends GoodsList{
    removeToCart(goodId){};
    cleanCart(){};
    updateCartItem(goodId, goods){};
};

const list = new GoodsPage(".goods-list"); // Создание обьекта на основе класса GoodsList
list.fetchGoods().then(()=>{
    list.render();
});





/*const async = (a)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(a){
                const b=a+1
                resolve(b)
            }else{
                reject('Errorrr')
            }
        }, 2000);
    });
};

async(10).then((res)=>{
    console.log(res);
    return async(res)
}).then((res)=>{
    console.log(res)
}).catch((e)=>{
    console.error(e)
});*/
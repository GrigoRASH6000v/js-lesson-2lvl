
class MenuItem{
    constructor(name, color, width){
        this.name = name;
        this.color = color;
        this.width = width;
    }
    makeRed(){
        this.color = 'red';
    }
    
}

class MainMenuItem extends MenuItem{
    makeGreen(){
        this.color = 'green';
    }
}

const item = new MenuItem('serega', 'blue', 300);
item.makeRed();
console.log(item)

const mainItem = new MainMenuItem('vitek', 'yellow', 600);
mainItem.makeGreen();
console.log(mainItem)
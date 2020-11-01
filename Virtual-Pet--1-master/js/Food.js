class Food{
    constructor(){
        this.image = loadImage("images/Milk.png")
        this.foodStock
        this.lastFed
    }

    getFoodStock(){
        this.foodStock = foodS
    }

    updateFoodStock(){
        foodStock.on("value", function(data){
            Food = data.val();
        });
    }

    deductFood(){
    
    }

    display(){
        var x=80,y=100;
        
        Food:foodObj.getFoodStock()

        imageMode(CENTER);
        //image(this.image,720,220,70,70);


        if(this.foodStock>0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x = 500;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
    }
}
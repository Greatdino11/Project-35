var dog, dogImg, happyDog, database, foodS, foodStock, fedTime, lastFed, foodObj;

function preload()
{
  dogImg = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(860, 400);
  database = firebase.database();
  dog = createSprite(250, 250);
  dog.addImage(dogImg);
  dog.scale = 0.25;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);


  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
}

function draw() {  
  background(46, 139, 87);
  

  drawSprites();
  textSize(18);
  fill("White");
  stroke("black");
  foodObj.display();
  //text("Food Remaining: " + foodS, 170, 100);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350, 30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed : "+ lastFed + " AM", 350, 30);
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  text("Food Remaining: " + foodS, 170, 100);
  if(foodS<0){
    foodS = 0;
  }
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodS = foodS-1;
  database.ref('/').update({
    Food:foodS
  })


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
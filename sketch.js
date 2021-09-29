//Create variables here

var dogImg,happyDogImg,database,foodS,foodStock,dog,happyDog;
var lastFed;

function preload()
{
	//load images here
  dogImg = loadImage("images/Dog.png")
  happyDogImg = loadImage("images/happydog.png")
}

function setup() {
	createCanvas(1000, 400);

  dog = createSprite(800,250,10,10)
  dog.addImage(dogImg)
  dog.scale=0.3;
  
  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('food')
  foodStock.on("value",readStock)

  feed = createButton('Feed the Dog');
  feed.position(700, 100);
  feed.mousePressed(feedDog);
  
  addFood = createButton('Add Food');
  addFood.position(800, 100);
  addFood.mousePressed(addFoods);
  

}


function draw() {  

  background("lightgreen");

  foodObj.display();

  fedTime = database.ref('feedTime');
  fedTime.on('value', function(data){
    lastFed = data.val();
  })

  fill(255,255,254); 
  textSize(15); 

  if(lastFed>=12){
     text("Last Fed : "+ lastFed%12 + " PM", 350,30); 
}
  else if(lastFed==0){ text("Last Feed : 12 AM",350,30);
 }
  else{ text("Last Fed : "+ lastFed + " AM", 350,30); }


  drawSprites();
  //add styles here
  

  

}

function readStock(data){
 foodS = data.val()
 foodObj.updateFoodStock(foodS)
}

function feedDog(){
   dog.addImage(happyDogImg); 
   if(foodObj.getFoodStock()<= 0){ 
     foodObj.updateFoodStock(foodObj.getFoodStock()*0); 
  }
   else{ 
     foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   } 

  database.ref('/').update({ food:foodObj.getFoodStock(), FeedTime:hour() }) }

function addFoods(){ 
  foodS++; database.ref('/').update({ food:foodS }) 
}





var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodObject
var Feedtime
var lastfeed
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/Dog.png")
  dogimg2 = loadImage("images/happydog.png")
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodObject=new Food();
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED Dog")
  feed.position(500,15)
  feed.mousePressed(FeedDog);
  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)

} 

function draw(){
 background(46,139,87);

 foodObject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);
 if (lastFeed>=12){
   text("last Feed :"+lastFeed%12+"PM",350,30);
 

 }else if(lastFeed==0){
   text("last Feed : 12 AM",350,30);
 }else{
   text("last Feed :"+lastFeed+"AM",350,30)
 }

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodObject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodObject.updateFoodStock(foodObject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodObject.getFoodStock(),
   FeedTime:hour ()
 })
}
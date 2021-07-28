//Create variables here
var dog,dogImg,dogImg1,database,foods,foodStock;


function preload()
{
	//load images here
  dogImg = loadImage("Images/dogImg.png");
  dogImg1= loadImage("Images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);
  foodStock.set(20);
  
  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
}


function draw() {  

   background("green");

     if (keyWentDown(UP_ARROW)){
       writeStock(foods);
       dog.addImage(dogImg1);
     }

     if(keyWentUp(UP_ARROW)){
       dog.addImage(dogImg);
     }

     


  drawSprites();
  //add styles here
  fill(255,255,254);
  stroke("black");
  text("Food remaining;"+foods,170,200);
  textSize(13);
  text("Note:Press UP ARROW to food DRAGO milk",130,10,300,20);
    }


function writeStock(x){
  if(x<=0){
    x = 0;
  }

  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foods = data.val();
}

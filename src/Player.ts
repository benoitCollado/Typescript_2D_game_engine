import {Actor} from "./engine/Actor"
import { KEYBOARD } from "./main";
import {Projectile} from "./Projectile";
import {IMAGE_LOADER} from "./engine/ImageLoader";
import { ctx } from "./engine/graphics/ContextUtilities";
import {Prototype} from "./Prototype";

import {Shape} from "./engine/Shape"
import {Vector2D} from "./engine/vector2D"
const points : Vector2D[] =[
  /*new Vector2D(0,0),
  new Vector2D(3.22, -7.8),
  new Vector2D(11,-11),
  new Vector2D(18.8,-7.8),
  new Vector2D(22,0),
  new Vector2D(18.8, 7.8),
  new Vector2D(11, 11),
  new Vector2D(3.22, 7.8)*/
  new Vector2D(0,0),
  new Vector2D(20,0),
  new Vector2D(20,20),
  new Vector2D(0,20)
];
const origin = new Vector2D(10,10);
const xShape : Shape = new Shape(points, origin);


const COOLDOWN = 15;


export class Player extends Actor implements Prototype<Player>{

  direction : Vector2D = new Vector2D(1,0);
  vectorDirection : Vector2D = new Vector2D(1,0);
  cooldown : number = 0;
  constructor(position:[number, number]=[0,0], width:number, height:number, shape : Shape = xShape, speed : number = 15){
    super("player", position, width, height, shape, speed);
    /*console.log("shape : " );
    console.log(shape.vertices[0]);*/
    this.init();
  }

  init(): void {
   super.init();
    //this._sprite.setTexture(IMAGE_LOADER.getImage("player"));
    this.cooldown = COOLDOWN;
    /*document.addEventListener("click", (event) => {
      this._transform.move_to([Math.round(event.clientX), Math.round(event.clientY)]);
      console.log("click de actor" + " EventclientX: " + event.clientX + " EventclienY: " + event.clientY);
    });*/
}

  update(delaTime:number) {
    //console.log(this._transform.position);
    super.update(delaTime);
    this.inputManager(delaTime);
    //console.log(this._bodyComponent.position);
  }

  inputManager(deltatime:number) {

    let x_goal = 0;
    let y_goal = 0;
    this.vectorDirection = new Vector2D(0,0)
    if (KEYBOARD._keys["z"]) {
      //this._transform.Yvelocity = -1;
      y_goal += -1;

    } 
    if (KEYBOARD._keys["s"]) {
      //this._transform.Yvelocity = 1;
      y_goal += 1;
    }
    
    if (KEYBOARD._keys["q"]) {
      //this._transform.Xvelocity = -1;
      x_goal += -1;
    } 
    if (KEYBOARD._keys["d"]) {
      //this._transform.Xvelocity = 1;
      x_goal += 1

    }

    if(x_goal !== 0 || y_goal !== 0){
      this.direction = new Vector2D(x_goal,y_goal);
      this.vectorDirection = new Vector2D(
        x_goal,
        y_goal
      );
      this.vectorDirection.normalize();
     
      this.vectorDirection = this.vectorDirection.multiply(this._bodyComponent.speed*deltatime)
      this._bodyComponent.position = this._bodyComponent.position.add(this.vectorDirection);
      //this._transform.move_to([this._transform.x + x_goal * this._transform.speed, this._transform.y + y_goal * this._transform.speed]);

    }
   
    if(this.cooldown  === 0){
      if(KEYBOARD._keys[" "]){
        const projectile = new Projectile("projectile", [this._bodyComponent.position.x, this._bodyComponent.position.y], this.direction, 50, 5,5);
        this.cooldown = COOLDOWN;
      }
    }else{
      this.cooldown = this.cooldown - 1;
    }
     //console.log(KEYBOARD._keys);
  } 

  public draw(): void {
    super.draw()
    let x = this._bodyComponent.position.x;
    let y = this._bodyComponent.position.y;
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this._bodyComponent.position.x, this._bodyComponent.position.y, 10, 0, 2*Math.PI);
    ctx.fill();
}

  clone(): Player {
   return Object.create(this); 
}
}
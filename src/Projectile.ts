/*import {Actor} from "./engine/Actor";
import {IMAGE_LOADER} from "./engine/ImageLoader";
import { Emitter, EventArgs, CollisionEventArgs} from "./engine/utils";
import { ColliderComponent} from "./engine/ECS/ColliderComponent";
import {ctx} from "./engine/graphics/ContextUtilities";
import {invisible_part} from "./main";

import {Shape} from "./engine/Shape"
import {Vector2D} from "./engine/vector2D"
const points : Vector2D[] =[
  new Vector2D(0,0),
  new Vector2D(8,-4),
  new Vector2D(16,0),
  new Vector2D(16,16),
  new Vector2D(8,20),
  new Vector2D(0,16)
];
const origin = new Vector2D(8,8);
const xShape : Shape = new Shape(points, origin);

export class Projectile extends Actor{
  direction : [number, number] = [0,0];
  speed : number = 3;
  log_pos: string = "";
  
  constructor(name:string, position:[number, number] =[0,0], direction:[number,number], speed:number, width:number, height:number, shape: Shape = xShape){
    super(name,position, width, height, shape, speed);
    //console.log("constructeur projectile : ", direction);
    this.direction = direction;
    this.speed = speed;
    this.init();
  }
  init(): void {
    this._collider._solid = false;
    //console.log("dans le init projectile : ", this.direction);
    //this._sprite.setTexture(IMAGE_LOADER.getImage("projectile"));
    this._transform.speed = this.speed;
    this._transform.move_direction(this.direction);
    super.init();
 }
  
  notified<T extends Emitter, U extends EventArgs>(emitter: T, args: U): void {
   if(emitter instanceof ColliderComponent && args.eventName === "collision"){
     if("other" in args && "solid" in args ){
        const newArgs = args as CollisionEventArgs;
       if(newArgs.other.entity.name === "enemy"){
          this.destroy();
        }
     }
     
   } 
}
  update(deltaTime:number): void {
    
   super.update(deltaTime);

    if(this._transform.x > window.innerWidth || this._transform.y > window.innerHeight || this._transform.x < 0 || this._transform.y < 0){
      //console.log("hors de l'écran");
      //invisible_part.textContent += this.log_pos;
      this.destroy();
    }
    this.log_pos += `${this.id} ; x: ${this._transform.x} ; y: ${this._transform.y} \n`;
}

  draw () {
    super.draw()
    let x = this._transform._position.x;
    let y = this._transform._position.y;
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this._transform._position.x, this._transform._position.y, 5, 0, 2*Math.PI);
    ctx.fill();
  }
}*/
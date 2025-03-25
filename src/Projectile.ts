import {Actor} from "./engine/Actor";
import {IMAGE_LOADER} from "./engine/ImageLoader";
//import { Emitter, EventArgs, CollisionEventArgs} from "./engine/utils";
//import { ColliderComponent} from "./engine/ECS/ColliderComponent";
import {ctx} from "./engine/graphics/ContextUtilities";
import {invisible_part} from "./main";

import {Shape} from "./engine/Shape"
import {Vector2D} from "./engine/vector2D"
const points : Vector2D[] =[
  new Vector2D(0,0),
  new Vector2D(10,0),
  new Vector2D(10,10),
  new Vector2D(0,10)
];
const origin = new Vector2D(5,5);
const xShape : Shape = new Shape(points, origin);

export class Projectile extends Actor{
  direction : Vector2D;
  speed : number = 3;
  log_pos: string = "";
  
  constructor(name:string, position:[number, number] =[0,0], direction:Vector2D, speed:number, width:number, height:number, shape: Shape = xShape){
    super(name,position, width, height, shape, speed);
    //console.log("constructeur projectile : ", direction);
    direction.normalize();
    this.direction = direction;
    this.speed = speed;
    this.init();
  }
  init(): void {
    this._bodyComponent.solid = false;
    //console.log("dans le init projectile : ", this.direction);
    //this._sprite.setTexture(IMAGE_LOADER.getImage("projectile"));
    //this._transform.speed = this.speed;
    //this._transform.move_direction(this.direction);
    
    super.init();
 }
  
  /*notified<T extends Emitter, U extends EventArgs>(emitter: T, args: U): void {
   if(emitter instanceof ColliderComponent && args.eventName === "collision"){
     if("other" in args && "solid" in args ){
        const newArgs = args as CollisionEventArgs;
       if(newArgs.other.entity.name === "enemy"){
          this.destroy();
        }
     }
     
   } 
}*/
  update(deltaTime:number): void {
    
   super.update(deltaTime);
  this._bodyComponent.position = this._bodyComponent.position.add(this.direction.multiply(this.speed*deltaTime));
    if(this._bodyComponent.position.x > window.innerWidth || this._bodyComponent.position.y > window.innerHeight || this._bodyComponent.position.x < 0 || this._bodyComponent.position.y < 0){
      //console.log("hors de l'écran");
      //invisible_part.textContent += this.log_pos;
      
      console.log("détruit");
      console.log(this.manager.collidables.length);
      const index = this.manager.collidables.indexOf(this._bodyComponent);
      this.manager.collidables.splice(index,1);
      this.destroy();
    }
    this.log_pos += `${this.id} ; x: ${this._bodyComponent.position.x} ; y: ${this._bodyComponent.position.x} \n`;
}

  draw () {
    super.draw()
    let x = this._bodyComponent.position.x;
    let y = this._bodyComponent.position.y;
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this._bodyComponent.position.x, this._bodyComponent.position.y, 5, 0, 2*Math.PI);
    ctx.fill();
  }

  onCollision(other: Actor): void {
    if(other.name === "Enemy"){
      console.log("détruit");
      console.log(this.manager.collidables.length);
      const index = this.manager.collidables.indexOf(this._bodyComponent);
      this.manager.collidables.splice(index,1);
      console.log(`Collision avec un Enemy -> x:${other._bodyComponent.position.x}, y:${other._bodyComponent.position.y}` );
      this.destroy();
    }  
  }
}
import {Actor} from "./engine/Actor";
import {IMAGE_LOADER} from "./engine/ImageLoader";
import { Emitter, EventArgs, CollisionEventArgs} from "./engine/utils";
import { ColliderComponent} from "./engine/ECS/ColliderComponent";
import {ctx} from "./engine/graphics/ContextUtilities";

export class Projectile extends Actor{
  direction : [number, number] = [0,0];
  speed : number = 3;
  constructor(name:string, position:[number, number] =[0,0], direction:[number,number], speed:number){
    super(name,position);
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
  update(): void {
    
   super.update();

    if(this._transform.x > window.innerWidth || this._transform.y > window.innerHeight || this._transform.x < 0 || this._transform.y < 0){
      //console.log("hors de l'écran");
      this.destroy()
    }
}

  draw () {
    super.draw()
    let x = this._transform._position.x;
    let y = this._transform._position.y;
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this._transform._position.x, this._transform._position.y, 5, 0, 2*Math.PI);
    ctx.fill();
    ctx.fillStyle = "white"
  }
}
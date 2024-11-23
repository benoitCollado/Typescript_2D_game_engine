import {Actor} from "./engine/Actor";
import {IMAGE_LOADER} from "./engine/ImageLoader";

export class Projectile extends Actor{
  direction : [number, number] = [0,0];
  speed : number = 5;
  constructor(name:string, position:[number, number] =[0,0], direction:[number,number], speed:number){
    super(name,position);
    console.log("constructeur projectile : ", direction);
    this.direction = direction;
    this.speed = speed;
    this.init();
  }
  init(): void {
    this._collider._solid = false;
    console.log("dans le init projectile : ", this.direction);
    this._sprite.setTexture(IMAGE_LOADER.getImage("projectile"));
    this._transform.speed = this.speed;
    this._transform.move_direction(this.direction);
    super.init();
 }
  update(): void {
    
   super.update();

    if(this._transform.x > window.innerWidth && this._transform.y > window.innerHeight){
      this.manager.removeEntity(this);
    }
}
}
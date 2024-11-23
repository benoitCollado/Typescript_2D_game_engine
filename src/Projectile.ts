import {Actor} from "./engine/Actor";

export class Projectile extends Actor{
  direction : [number, number] = [0,0];
  constructor(name:string, position:[number, number] =[0,0], direction:[number,number]){
    super(name,position);
    console.log("constructeur projectile : ", direction);
    this.direction = direction;
    this.init();
  }
  init(): void {
   this._sprite.setTexture("./dist/assets/projectile.png"); 
    this._collider._solid = false;
    console.log("dans le init projectile : ", this.direction);
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
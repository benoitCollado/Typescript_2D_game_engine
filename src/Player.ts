import {Actor} from "./engine/Actor"
import { KEYBOARD } from "./main";
import {Projectile} from "./Projectile";
import {IMAGE_LOADER} from "./engine/ImageLoader";
import { ctx } from "./engine/graphics/ContextUtilities";


const COOLDOWN = 2;


export class Player extends Actor{

  direction : [number, number] = [1,0];
  cooldown : number = 0;
  constructor(position:[number, number]=[0,0]){
    super("player", position);
    this.init();
  }

  init(): void {
   super.init();
    //this._sprite.setTexture(IMAGE_LOADER.getImage("player"));
    this.cooldown = COOLDOWN;  
}

  update() {
    this.inputManager();
    //console.log(this._transform.position);
    super.update();
  }

  inputManager() {

    let x_goal = 0;
    let y_goal = 0;
    if (KEYBOARD._keys["z"]) {
      //this._transform.Yvelocity = -1;
      y_goal = -1;

    } else if (KEYBOARD._keys["s"]) {
      //this._transform.Yvelocity = 1;
      y_goal = 1;
    }
    
    if (KEYBOARD._keys["q"]) {
      //this._transform.Xvelocity = -1;
      x_goal = -1;
    } else if (KEYBOARD._keys["d"]) {
      //this._transform.Xvelocity = 1;
      x_goal = 1

    }

    if(x_goal !== 0 || y_goal !== 0){
      this.direction = [x_goal,y_goal];
    }
    this._transform.move_to([this._transform.x + x_goal * this._transform.speed, this._transform.y + y_goal * this._transform.speed]);
    
    if(this.cooldown  === 0){
      if(KEYBOARD._keys[" "]){
        const projectile = new Projectile("projectile", [this._transform.x, this._transform.y], this.direction, 10);
        this.cooldown = COOLDOWN;
      }
    }else{
      this.cooldown = this.cooldown - 1;
    }
     //console.log(KEYBOARD._keys);
  } 

  public draw(): void {
    super.draw()
    let x = this._transform._position.x;
    let y = this._transform._position.y;
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this._transform._position.x, this._transform._position.y, 10, 0, 2*Math.PI);
    ctx.fill();
    ctx.fillStyle = "white"
}
}
import {Actor} from "./engine/Actor"
import { KEYBOARD } from "./main";
import {Projectile} from "./Projectile";
import {IMAGE_LOADER} from "./engine/ImageLoader";
export class Player extends Actor{

  direction : [number, number] = [1,0];
  cooldown : number = 0;
  constructor(position:[number, number]=[0,0]){
    super("player", position);
    this.init();
  }

  init(): void {
   super.init();
    this._sprite.setTexture(IMAGE_LOADER.getImage("player"));
    this.cooldown = 60;
}

  update() {
    this.inputManager();
    //console.log(this._transform.position);
    super.update();
  }

  inputManager() {

    let x_goal = 0;
    let y_goal = 0;
    if (KEYBOARD._keys["ArrowUp"] || KEYBOARD._keys["z"]) {
      //this._transform.Yvelocity = -1;
      y_goal = -1;

    } else if (KEYBOARD._keys["ArrowDown"] || KEYBOARD._keys["s"]) {
      //this._transform.Yvelocity = 1;
      y_goal = 1;
    }
    
    if (KEYBOARD._keys["ArrowLeft"] || KEYBOARD._keys["q"]) {
      //this._transform.Xvelocity = -1;
      x_goal = -1;
    } else if (KEYBOARD._keys["ArrowRight"] || KEYBOARD._keys["d"]) {
      //this._transform.Xvelocity = 1;
      x_goal = 1

    }

    if(x_goal !== 0 || y_goal !== 0){
      this.direction = [x_goal,y_goal];
    }

    this._transform.move_to([this._transform.x + x_goal * this._transform.speed, this._transform.y + y_goal * this._transform.speed]);
    if(this.cooldown  === 0){
      if(KEYBOARD._keys["Space"]){
        console.log("dans le player : ", this.direction);
        const projectile = new Projectile("projectile", [this._transform.x, this._transform.y], this.direction, 10);
        this.cooldown = 30;
      }
    }else{
      this.cooldown = this.cooldown - 1;
    }
  }
  
}
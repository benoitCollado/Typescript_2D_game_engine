import { Actor } from "./engine/Actor";
import { Player } from "./Player";
import {IMAGE_LOADER} from "./engine/ImageLoader";
import { ctx } from "./engine/graphics/ContextUtilities";
import {Shape} from "./engine/Shape"
import {Vector2D} from "./engine/vector2D"
const points : Vector2D[] =[
  /* new Vector2D(0,0),
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

export class Enemy extends Actor {
  public followTo: Player | undefined;
  public life : number;
  
  constructor(position:[number,number]=[0,0], width:number, height:number, shape: Shape = xShape, speed: number = 1, life = 10) {
    super("enemy", position, width, height, shape, speed);
    this.init();
    this.life = life;
  }

  init(): void {
   //this._sprite.setTexture(IMAGE_LOADER.getImage("player")); 
}

  update(deltaTime:number): void {
    /*if (this.followTo !== undefined) {
      if (Math.abs(this.followTo._transform.x - this._transform.x) > 30 || Math.abs(this.followTo._transform.y - this._transform.y) > 30) {
        this._transform.move_to([
          this.followTo._transform.x,
          this.followTo._transform.y,
        ]);
      }
    }*/
    if(this.life <= 0){
      this.destroy();
    }
    super.update(deltaTime);
  }

  draw(): void {
    super.draw()
    let x = this._bodyComponent.position.x;
    let y = this._bodyComponent.position.y;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this._bodyComponent.position.x, this._bodyComponent.position.y, 10, 0, 2*Math.PI);
    ctx.fill();
  }

  takeDamage(damage:number){
    this.life -= damage;
  }
}

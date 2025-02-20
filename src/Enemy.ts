import { Actor } from "./engine/Actor";
import { Player } from "./Player";
import {IMAGE_LOADER} from "./engine/ImageLoader";
import { ctx } from "./engine/graphics/ContextUtilities";

export class Enemy extends Actor {
  public followTo: Player | undefined;
  constructor(position:[number,number]=[0,0]) {
    super("enemy", position);
    this.init();
  }

  init(): void {
   //this._sprite.setTexture(IMAGE_LOADER.getImage("player")); 
}

  update(): void {
    if (this.followTo !== undefined) {
      if (Math.abs(this.followTo._transform.x - this._transform.x) > 30 || Math.abs(this.followTo._transform.y - this._transform.y) > 30) {
        this._transform.move_to([
          this.followTo._transform.x,
          this.followTo._transform.y,
        ]);
      }
    }
    super.update();
  }

  draw(): void {
    super.draw()
    let x = this._transform._position.x;
    let y = this._transform._position.y;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this._transform._position.x, this._transform._position.y, 10, 0, 2*Math.PI);
    ctx.fill();
    ctx.fillStyle = "white"
}
}

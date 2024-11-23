import { Actor } from "./engine/Actor";
import { Player } from "./Player";

export class Enemy extends Actor {
  public followTo: Player | undefined;
  constructor(position:[number,number]=[0,0]) {
    super("enemy", position);
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
}

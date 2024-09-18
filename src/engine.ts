import { ContextUtilities as CTXU, ctx } from "./graphics/ContextUtilities";
import { Vector2D as Vec2 } from "./vector2D";
import * as ECS from "./ECS/ECS";
import { TransformComponent } from "./ECS/TransformComponent";
import { SpriteComponent } from "./ECS/SpriteComponent";
export class Engine {
  private _canvas: HTMLCanvasElement;
  private _startTime: number;
  private _manager: ECS.Manager;

  constructor(canvasID: string) {
    this._canvas = CTXU.initialize(canvasID);
    this._startTime = 0;
    this._manager = new ECS.Manager();
    document.title = "Game Engine";
  }
  public resize() {
    if (this._canvas !== undefined) {
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;
    }
  }

  start(): void {
    let player = this._manager.addEntity("Palyer");
    //console.log(player);
    player.addComponent(TransformComponent, [200, 200], 2, 32, 32, 3);
    player.addComponent(SpriteComponent, "./dist/assets/player.png", 32, 32);
    console.log("managers entities : " + Object.values(this._manager.entities));
    this.loop(this._startTime);
    this.resize();
  }
  loop(timeStamp: number): void {
    if (this._startTime === undefined) {
      this._startTime = timeStamp;
    }
    //console.log(ctx);
    //ctx.fillStyle = "rgb(0.3,0.2,0.5,1)";
    ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._manager.update();
    this._manager.draw();
    const deltaTime = timeStamp - this._startTime;
    // document.title = (1 / (deltaTime / 1000)).toString();

    this._startTime = timeStamp;
    requestAnimationFrame((time) => this.loop(time));
  }
}

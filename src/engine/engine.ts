import { ContextUtilities as CTXU, ctx } from "./graphics/ContextUtilities";
import * as ECS from "./ECS/ECS";
import { Player } from "../Player";
import { Enemy } from "../Enemy";
import { MANAGER } from "../engine/ECS/ECS";
import {KEYBOARD} from "../main";
//import { CollisionManager } from "../engine/CollisionDetector";
//import {COLLISION_MANAGER} from "./utils";

export class Engine {
  private _canvas: HTMLCanvasElement;
  private _startTime: number;
  private _manager: ECS.Manager;
  private _sum: number;
  private _frame: number;
  private _fps: number;
  private _deltaTime:number;
  //private _collision_manager: CollisionManager;

  constructor(canvasID: string) {
    this._canvas = CTXU.initialize(canvasID);
    this._startTime = 0;
    this._manager = MANAGER;
    //this._collision_manager = COLLISION_MANAGER;
    document.title = "Game Engine";
    this._fps = 0;
    this._sum = 0;
    this._frame = 0;
    this._deltaTime=0;
  }
  public resize() {
    if (this._canvas !== undefined) {
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;
    }
  }

  start(): void {
    let player = new Player([0,0],20,20);
    let second = new Enemy([300,300],20,20);
    let third = new Enemy([500,500],20,20);
    //second.followTo = player;
    console.log(this._manager.entities);

    this.loop(this._startTime);
    this.resize();
  }
  loop(timeStamp: number): void {
    if (this._startTime === undefined) {
      this._startTime = timeStamp;
    }
    ctx.fillStyle ="black";
    ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._deltaTime = timeStamp - this._startTime;
    this._manager.update(this._deltaTime/100);
    this._manager.update_collision();
    this._manager.draw();
    const deltaTime = timeStamp - this._startTime;
    this._sum += deltaTime;
    this._frame += 1;
    if (this._sum/1000 > 1) {
      this._fps = Math.round(1/((this._sum / this._frame)/1000));
      this._sum = 0;
      this._frame = 0;
    }

    
    //console.log("j'ai modifié");
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("FPS : " + this._fps, 150, 40);
    let arrayKey : [string, boolean][] = Object.entries(KEYBOARD._keys);
    let keys = arrayKey.filter(([key, value])=> value === true)
    ctx.fillText("Touches : " + keys.toString(), 250, 40);
    
    this._startTime = timeStamp;
    requestAnimationFrame((time) => this.loop(time));
  }
}

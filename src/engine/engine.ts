import { ContextUtilities as CTXU, ctx } from "./graphics/ContextUtilities";
import * as ECS from "./ECS/ECS";
import { Player } from "../Player";
import { Enemy } from "../Enemy";
import { MANAGER } from "../engine/ECS/ECS";
import {KEYBOARD} from "../main";
import { Vector2D } from "./vector2D";
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

  async start(): Promise<void> {
    let player = new Player([0,0],20,20);
    let second = new Enemy([300,300],20,20);
    let third = new Enemy([500,500],20,20);
    //let playerClone = player.clone();
    //playerClone._bodyComponent.position = new Vector2D(500,500);
    //second.followTo = player;
    console.log(this._manager.entities);
    this.resize();
    this.loop(this._startTime);
    
  }
  
  loop(timeStamp: number): void {
    if (this._startTime === undefined) {
      this._startTime = timeStamp;
    }
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._deltaTime = timeStamp - this._startTime;
    this._manager.runGame(this._deltaTime/100);
    //const deltaTime = timeStamp - this._startTime;
    this._sum += this._deltaTime;
    this._frame += 1;
    if (this._sum/1000 >= 1) {
      console.log(this._sum);
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

  /*async loop() : Promise<void> {
    let timeStamp: number;
    this._startTime = Date.now();
    console.log("commencement de la loop");
    
    while(true){
      console.log("début de la loop");
      timeStamp = Date.now()
      ctx.fillStyle ="black";
      ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
      this._deltaTime = timeStamp - this._startTime;
      this._manager.runGame(this._deltaTime/100);
      this._sum += this._deltaTime;
      this._frame += 1;
      if (this._sum/1000 >=1) {
        this._fps = Math.round(1/((this._sum / this._frame)/1000));
        this._sum = 0;
        this._frame = 0;
      }
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText("FPS : " + this._fps, 150, 40);
      let arrayKey : [string, boolean][] = Object.entries(KEYBOARD._keys);
      let keys = arrayKey.filter(([key, value])=> value === true)
      ctx.fillText("Touches : " + keys.toString(), 250, 40);

      this._startTime = timeStamp;
    }
  }*/
}

import Texture from "./Texture";
import Vector2D from "./Vector2D";

export class Animation2D{
  public name: string;
  public frames: Texture[];
  public frameDurations: number[];
  public loop: boolean;
  public currentFrame: number;
  public timer: number;

  constructor(name:string, frames: Texture[], frameDurations: number[], loop: boolean){
    this.name = name;
    this.frames = frames;
    this.frameDurations = frameDurations;
    this.loop = loop;
    this.currentFrame = 0;
    this.timer = 0;
  }

  render(ctx: CanvasRenderingContext2D, positon: Vector2D, frame: number){
    this.frames[frame].render(ctx, positon);
  }

  onEnter(){
    this.currentFrame = 0;
    this.timer = 0;
  }
  
}

export interface AnimationState {
  stateEnum: AnimationStateEnum;
  Animation: AnimationOrientation;
}

export enum AnimationStateEnum{
  "walking",
  "idle",
  "run",
  "jump"
} 
export enum AnimationOrientation {
  "left",
  "right",
  "up",
  "down"
}


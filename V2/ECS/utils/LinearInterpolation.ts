import Vector2D from "./Vector2D";

export enum LinearInterpolationType{
  Lerp,
  EaseIn,
  EaseOut
}

enum LinearStatus{
  Waiting,
  Progress
}

export default class LinearInterpolation{
  
  public origin : Vector2D;
  public target : Vector2D;
  public time : number = 0;
  public duration : number;
  public type: LinearInterpolationType;
  public status: LinearStatus;

  constructor(origin:Vector2D = new Vector2D(0,0), target: Vector2D = new Vector2D(0,0), duration : number = 100, type: LinearInterpolationType =LinearInterpolationType.Lerp){
    this.origin = origin;
    this.target = target;
    this.duration = duration // in miliseconds
    this.type = type;
    this.status = LinearStatus.Waiting;
  }

  
  private lerp():Vector2D{
    if(this.time > this.duration/1000){
      this.status = LinearStatus.Waiting;
      this.time = 0;
      this.origin = this.target
      return this.target;
    }
    let inter = this.target.substract(this.origin);
   
    inter = inter.multiply((this.time)/(this.duration/1000));
    return this.origin.add(inter);
  }

  setTarget(target: Vector2D):void{
    this.target = target;
    this.status = LinearStatus.Progress;
  }

  update(deltatime : number): Vector2D | undefined{
    if(this.status === LinearStatus.Progress){
      this.time += deltatime;
      switch(this.type){
        case LinearInterpolationType.Lerp:
          return this.lerp();
        /*case LinearInterpolationType.EaseIn:
        case LinearInterpolationType.EaseOut:
        default:
          break;*/
      }
    }
  }

  
}
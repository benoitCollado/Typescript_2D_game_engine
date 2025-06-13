import TextureType from "./TextureType";
import Vector2D from "./Vector2D";

export default class PolygonTexture extends TextureType{
  private shape : Vector2D[];
  private origin : Vector2D;
  private color : string;
  private fill : boolean;

  constructor(shape:Vector2D[] = [new Vector2D(0,0), new Vector2D(10,0), new Vector2D(10,10), new Vector2D(0,10)], origin:Vector2D = new Vector2D(5,5), color: string = 'rgb(100,50,255)', fill:boolean = true){
    super();
    this.shape = shape;
    this.origin = origin;
    this.color = color;
    this.fill = fill;
  }

  renderTexture(ctx: CanvasRenderingContext2D, position: Vector2D): void {
    if(this.fill){
      ctx.fillStyle = this.color;
      ctx.beginPath();
      let pointInWorld = this.shape[0].add(position.substract(this.origin));
      ctx.moveTo(pointInWorld.x,pointInWorld.y);
      for(let i = 1 ; i < this.shape.length; i++){
        pointInWorld = this.shape[i].add(position.substract(this.origin));
        ctx.lineTo(pointInWorld.x,pointInWorld.y);
      }
      ctx.fill();
    } else{
      ctx.strokeStyle = this.color;
      ctx.beginPath();
      let pointInWorld = this.shape[0].add(position.substract(this.origin));
      ctx.moveTo(pointInWorld.x,pointInWorld.y);
      for(let i = 1 ; i < this.shape.length; i++){
        pointInWorld = this.shape[i].add(position.substract(this.origin));
        ctx.moveTo(pointInWorld.x,pointInWorld.y);
      }
      ctx.stroke();
    }
  }

  renderShape(ctx: CanvasRenderingContext2D, position: Vector2D){
    let pointInWorld = this.shape[0].add(position.substract(this.origin));
    ctx.moveTo(pointInWorld.x,pointInWorld.y);
    for(let i = 1 ; i < this.shape.length; i++){
      pointInWorld = this.shape[i].add(position.substract(this.origin));
      ctx.moveTo(pointInWorld.x,pointInWorld.y);
    }
    ctx.closePath();
  }
}
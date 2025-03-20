import * as ECS from "./ECS";
import { Vector2D } from "../vector2D";
import {Shape} from "../Shape"
import { ctx } from "../graphics/ContextUtilities";
import { TransformComponent } from "./TransformComponent";

export class BodyComponent extends ECS.Component{
  private position : Vector2D;
  private velocity : Vector2D= new Vector2D;
  private acceleration: Vector2D = new Vector2D;
  public dimension : Vector2D;
  public scale : Vector2D = new Vector2D(1,1);
  public solid : boolean = false;
  public _className: string = "BodyComponent";
  private rotation : number = 0;
  public speed : number;
  public shape : Shape;
  public hasMoved : boolean;

  public transform : TransformComponent | undefined;
  

  constructor(entity: ECS.Entity,position: Vector2D, dimension: Vector2D, shape: Shape, speed: number){
    super(entity);
    this.position = position;
    this.previousPosition = this.position;
    this.dimension = dimension;
    this.shape = shape;
    this.speed = speed;
    this.entity.manager.addCollidable(this);
    this.hasMoved = false;
  }

  init(): void {
    /* if(!this.entity.hasComponent(TransformComponent)){
      this.transform = this.entity.addComponent(TransformComponent, [0, 0], 0, 0, 0, 1);  
    }else{
      this.transform = this.entity.getComponent(TransformComponent);
    }*/
  }
  
  update(deltaTime: number): void {
   /* if(this.velocity.x === 0 && this.velocity.y === 0){
      this.velocity = this.position.substract(this.previousPosition);
    }*/
   /* if(this.transform){
      this.position = this.transform._position;
    }*/
    //console.log(this.shape);
    //console.log(this.shape.getAxes());
    
  }
  
  draw(): void {
    this.previousPosition = this.position;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.shape.vertices[0].x + this.position.x - this.shape.origin.x, this.shape.vertices[0].y + this.position.y - this.shape.origin.y)
    for(let x = 1; x <= this.shape.vertices.length; x++){
      ctx.lineTo(this.shape.vertices[x % this.shape.vertices.length].x + this.position.x - this.shape.origin.x, this.shape.vertices[x % this.shape.vertices.length].y + this.position.y - this.shape.origin.y);
    }
    ctx.stroke();

  }

  public set position(vector2 : Vector2D){
    this.poistion = vector2;
  }


  
}
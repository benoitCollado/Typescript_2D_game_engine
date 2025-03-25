import * as ECS from "./ECS";
import { Vector2D } from "../vector2D";
import {Shape} from "../Shape"
import { ctx } from "../graphics/ContextUtilities";
import { TransformComponent } from "./TransformComponent";
import { Actor } from "../Actor";
import { Emitter, Observer, EventArgs } from "../utils";

export class BodyComponent extends ECS.Component implements Emitter{
  private _position : Vector2D;
  private _velocity : Vector2D= new Vector2D;
  private _acceleration: Vector2D = new Vector2D;
  public dimension : Vector2D;
  public scale : Vector2D = new Vector2D(1,1);
  public solid : boolean = false;
  public _className: string = "BodyComponent";
  private _rotation : number = 0;
  public speed : number;
  public shape : Shape;
  public hasMoved : boolean;
  private _startPosition: Vector2D;

  public transform : TransformComponent | undefined;

  public observers: Observer[]= []
  

  constructor(entity: ECS.Entity,position: Vector2D, dimension: Vector2D, shape: Shape, speed: number){
    super(entity);
    this._position = position;
    this._startPosition = position;
    this.dimension = dimension;
    this.shape = shape;
    this.speed = speed;
    this.entity.manager.addCollidable(this);
    this.solid = true;
    this.hasMoved = false;
    this.attach(entity);
  }

  init(): void {
  }

  beforeUpdate(): void {
   this._startPosition  = this._position; 
}
  
  update(deltaTime: number): void {
    
  }
  
  draw(): void {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.shape.vertices[0].x + this.position.x - this.shape.origin.x, this.shape.vertices[0].y + this.position.y - this.shape.origin.y)
    for(let x = 1; x <= this.shape.vertices.length; x++){
      ctx.lineTo(this.shape.vertices[x % this.shape.vertices.length].x + this.position.x - this.shape.origin.x, this.shape.vertices[x % this.shape.vertices.length].y + this.position.y - this.shape.origin.y);
    }
    ctx.stroke();
  }

  beforeNextFrame(): void {
    
}

  public set position(vector2 : Vector2D){
    this._position = vector2;
    this._velocity = this._position.substract(this._startPosition);
    this.hasMoved = true;
  }
  public get position() : Vector2D {
    return this._position;
  }
  public set velocity(vector2 : Vector2D){
    this._velocity = vector2;
  }

  public get velocity() : Vector2D{
    return this._velocity;
  }

  emitCollision(other:Actor, ...args: any[]){

    
  }
  attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
        return console.log('Subject: Observer has been attached already.');
    }

    this.observers.push(observer);
  }

  detach(observer: Observer): void{
    const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
  }

  notify<T extends Emitter, U extends EventArgs>(emitter: T, args: U): void{
    for (const observer of this.observers) {
        observer.notified(emitter, args);
    }
  }
}
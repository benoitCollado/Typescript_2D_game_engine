import * as ECS from "./ECS";
import { Vector2D } from "../vector2D";

export class TransformComponent extends ECS.Component {
  public _position: Vector2D = new Vector2D();
  public _velocity: Vector2D = new Vector2D();
  public _acceleration: Vector2D = new Vector2D();
  public _mass: number;
  public _movment: Vector2D = new Vector2D();
  public _moveToCoroutine: Generator | null = null;
  

  public _className: string = "TransformComponent";

  private _speed: number;
  private _width: number;
  private _height: number;
  
  public offsetx: number = 0;
  public offsety: number = 0;
  public origin_point : string;

  private _scale: number;

  constructor(
    entity: ECS.Entity,
    position: [number, number],
    speed: number,
    width: number,
    height: number,
    scale: number,
    mass:number,
  ) {
    super(entity);
    this._position.x = position[0];
    this._position.y = position[1];
    this._speed = speed;
    this._width = width;
    this._height = height;
    this._scale = scale;
    this.order = 100;
    this._mass = mass;
    this.origin_point = "CENTER";
    if(this.origin_point === "CENTER"){
      this.offsetx = this._width /2;
      this.offsety = this._height/2;
    }
    
  }

  public get x(): number {
    return this._position.x;
  }

  public get y(): number {
    return this._position.y;
  }

  public set x(x: number) {
    this._position.x = x;
  }

  public set y(y: number) {
    this._position.y = y;
  }

  public get position(): [number, number] {
    return [this._position.x, this._position.y];
  }

  public set position(position: [number, number]) {
    this._position.x = position[0];
    this._position.y = position[1];
  }

  public get Xvelocity(): number {
    return this._velocity.x;
  }
  public get Yvelocity(): number {
    return this._velocity.y;
  }
  public get velocity(): [number, number] {
    return [this._velocity.x, this._velocity.y];
  }

  public set velocity(velocity: [number, number]) {
    this._velocity.x = velocity[0];
    this._velocity.y = velocity[1];
  }

  public set Xvelocity(velocity: number) {
    this._velocity.x = velocity;
  }

  public set Yvelocity(velocity: number) {
    this._velocity.y = velocity;
  }

  public get Xmovment(): number {
    return this._movment.x;
  }

  public get Ymovment(): number {
    return this._movment.y;
  }

  public set Xmovment(movment: number) {
    this._movment.x = movment;
  }

  public set Ymovment(movment: number) {
    this._movment.y = movment;
  }

  public get movment(): [number, number] {
    return [this._movment.x, this._movment.y];
  }

  public set movment(movment: [number, number]) {
    this._movment.x = movment[0];
    this._movment.y = movment[1];
  }

  public get speed(): number {
    return this._speed;
  }

  public set speed(speed: number) {
    this._speed = speed;
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public set height(heigth: number) {
    this._height = heigth;
  }

  public get scale(): number {
    return this._scale;
  }

  public set scale(scale: number) {
    this._scale = scale;
  }

  public get isMoving(): boolean {
    return this._movment.length > 0;
  }

  public init() {}

  public update(delaTime:number) {
    
    if (this._moveToCoroutine !== null) {
      const done = this._moveToCoroutine.next();
      if (done.value) {
        this._moveToCoroutine = null;
      }
    } else {
      this._movment.x = this._velocity.x;
      this._movment.y = this._velocity.y;
      this._movment.normalize();
      this._movment = this._movment.multiply(this._speed);
      this._position.x += this._movment.x;
      this._position.y += this._movment.y;
    }/*
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);*/
  }

  public draw() {
  }

  public move_to(position: [number, number]): void {
    this._moveToCoroutine = this._moveTo(position);
  }

  public move_direction(direction: [number, number]): void{
    this._moveToCoroutine = this._moveDirection(direction);
  }

  private *_moveTo(position: [number, number]): Generator<boolean> {
    //console.log("dans move_to  " + this.entity.name );
    this.Xvelocity = position[0] - this.x;
    this.Yvelocity = position[1] - this.y;
    while (
      Math.abs(this.x - position[0]) > 0.1 ||
      Math.abs(this.y - position[1]) > 0.1
    ) {
      this._movment.x = this._velocity.x;
      this._movment.y = this._velocity.y;
      this._movment.normalize();
      this._movment = this._movment.multiply(this._speed);
      const newPositonVec = new Vector2D(
        position[0] - this.x,
        position[1] - this.y,
      );
      if (this._movment.length > newPositonVec.length) {
        while (Math.abs(this.x - position[0]) > 0.1) {
          this.x - position[0] > 0 ? (this.x -= 0.05) : (this.x += 0.05);
          if (Math.abs(this.x - position[0]) < 0.1) {
            this.x = position[0];
            this.Xvelocity = 0;
          }
        }
        while (Math.abs(this.y - position[1]) > 0.1) {
          this.y - position[1] > 0 ? (this.y -= 0.05) : (this.y += 0.05);
          if (Math.abs(this.y - position[1]) < 0.1) {
            this.y = position[1];
            this.Yvelocity = 0;
          }
        }
      } else {
        this._position.x += this._movment.x;
        this._position.y += this._movment.y;
      }

      yield false;
    }
    this.Xvelocity = 0;
    this.Yvelocity = 0;
    return true;
  }
  private * _moveDirection(direction: [number, number]): Generator<Boolean>{
    this._movment.x = direction[0] ;
    this._movment.y = direction[1] ;
    while(true){
    this._position.x += this._movment.x * this._speed;
    this._position.y += this._movment.y * this._speed;
    yield false;
    }
    
  }
}

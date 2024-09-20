import * as ECS from "./ECS";
import { Vector2D } from "../vector2D";

export class TransformComponent extends ECS.Component {
  public _position: Vector2D = new Vector2D();
  private _velocity: Vector2D = new Vector2D();
  private _movment: Vector2D = new Vector2D();

  public _className: string = "TransformComponent";

  private _speed: number;
  private _width: number;
  private _height: number;

  private _scale: number;

  constructor(
    entity: ECS.Entity,
    position: [number, number],
    speed: number,
    width: number,
    height: number,
    scale: number,
  ) {
    super(entity);
    this._position.x = position[0];
    this._position.y = position[1];
    this._speed = speed;
    this._width = width;
    this._height = height;
    this._scale = scale;
  }

  public get x(): number {
    return this._position.x;
  }

  public get y(): number {
    return this._position.y;
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

  public set Yvelocity(velocity: number){
    this._velocity.y = velocity;
  }

  public get Xmovment(): number {
    return this._movment.x;
  }

  public get Ymovment(): number {
    return this._movment.y;
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

  public update() {
    this._movment.x = this._velocity.x;
    this._movment.y = this._velocity.y;
    this._movment.normalize();
    this._movment = this._movment.multiply(this._speed);
    this._position.x += this._movment.x;
    this._position.y += this._movment.y;
    //console.log(KEYBOARD._keys);
  }

  public draw() {}

  
}

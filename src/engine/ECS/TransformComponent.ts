import * as ECS from "./ECS";
import { Vector2D } from "../vector2D";
import { GeneratePrimeOptions } from "crypto";
import { ctx } from "../graphics/ContextUtilities";
import { isAscii } from "buffer";
import { createContext } from "vm";

export class TransformComponent extends ECS.Component {
  public _position: Vector2D = new Vector2D();
  private _velocity: Vector2D = new Vector2D();
  private _movment: Vector2D = new Vector2D();
  private _moveToCoroutine: Generator | undefined;

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
    if (this._moveToCoroutine !== undefined) {
      const done = this._moveToCoroutine.next();
      console.log("done " + done.value);
      if (done.value) {
        this._moveToCoroutine = undefined;
        console.log(this._moveToCoroutine);
      }
    } else {
      this._movment.x = this._velocity.x;
      this._movment.y = this._velocity.y;
      this._movment.normalize();
      this._movment = this._movment.multiply(this._speed);
      this._position.x += this._movment.x;
      this._position.y += this._movment.y;
    }
    //console.log(KEYBOARD._keys);
  }

  public draw() {
    /*
    if (this.entity.name === "player") {
      ctx.beginPath();
      ctx.arc(
        this.x + this.Xvelocity,
        this.y + this.Yvelocity,
        30,
        0,
        2 * Math.PI,
      );
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.fillStyle = "black";
    } else {
      ctx.beginPath();
      ctx.arc(
        this.x + this._movment.x,
        this.y + this._movment.y,
        30,
        0,
        2 * Math.PI,
      );
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.fillStyle = "black";
    }*/
  }

  public move_to(position: [number, number]): void {
    this._moveToCoroutine = this._moveTo(position);
  }

  private *_moveTo(position: [number, number]): Generator<boolean> {
    this.Xvelocity = position[0] - this.x;
    this.Yvelocity = position[1] - this.y;
    //console.log(this.Xvelocity + " " + this.Yvelocity);
    while (
      Math.abs(this.x - position[0]) > 0.1 ||
      Math.abs(this.y - position[1]) > 0.1
    ) {
      //console.log("là");
      this._movment.x = this._velocity.x;
      this._movment.y = this._velocity.y;
      this._movment.normalize();
      this._movment = this._movment.multiply(this._speed);
      const newPositonVec = new Vector2D(
        position[0] - this.x,
        position[1] - this.y
      );
      if (this._movment.length > newPositonVec.length) {
        while (Math.abs(this.x - position[0]) > 0.1) {
          this.x - position[0] > 0 ? this.x -= 0.05 : this.x += 0.05;
          if (Math.abs(this.x - position[0]) < 0.1) {
            this.x = position[0];
            this.Xvelocity = 0;
          }
          console.log("x : " + this.x);
        }
        while (Math.abs(this.y - position[1]) > 0.1) {
          this.y - position[1] > 0 ? this.y -= 0.05 : this.y += 0.05;
          if (Math.abs(this.y - position[1]) < 0.1) {
            this.y = position[1];
            this.Yvelocity = 0;
          }
          console.log("y : " + this.y);
        }
        
      } else {
        this._position.x += this._movment.x;
        this._position.y += this._movment.y;
      }

      yield false;
    }
    this.Xvelocity = 0;
    this.Yvelocity = 0;
    console.log("bonjour");
    return true;
  }
}

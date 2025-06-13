export default class Vector2D {
  public x: number;
  public y: number;
  constructor(x?: number, y?: number) {
    if (x !== undefined) {
      this.x = x;
    } else {
      this.x = 0;
    }
    if (y !== undefined) {
      this.y = y;
    } else {
      this.y = 0;
    }
  }
  add<T>(arg: T): Vector2D {
    const newV = new Vector2D();
    if (arg instanceof Vector2D) {
      newV.x = this.x + arg.x;
      newV.y = this.y + arg.y;
    } else if (typeof arg === "number") {
      newV.x = this.x + arg;
      newV.y = this.y + arg;
    }
    return newV;
  }
  substract<T>(arg: T): Vector2D {
    const newV = new Vector2D();
    if (arg instanceof Vector2D) {
      newV.x = this.x - arg.x;
      newV.y = this.y - arg.y;
    } else if (typeof arg === "number") {
      newV.x = this.x - arg;
      newV.y = this.y - arg;
    }

    return newV;
  }
  multiply<T>(arg: T): Vector2D {
    const newV = new Vector2D();
    if (arg instanceof Vector2D) {
      newV.x = this.x * arg.x;
      newV.y = this.y *= arg.y;
    } else if (typeof arg === "number") {
      newV.x = this.x * arg;
      newV.y = this.y * arg;
    }
    return newV;
  }
  divide<T>(arg: T): Vector2D {
    const newV = new Vector2D();
    if (arg instanceof Vector2D) {
      newV.x = this.x / arg.x;
      newV.y = this.y / arg.y;
    } else if (typeof arg === "number") {
      newV.x = this.x / arg;
      newV.y = this.y / arg;
    }
    return newV;
  }

  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  dot(arg: Vector2D){
    return this.x * arg.x + this.y * arg.y;
  }

  normalize() : void{
    if (this.length !== 0) {
      const length = this.length;
      this.x = this.x / length;
      this.y = this.y / length;
    }
  }

  neg():Vector2D{
    return new Vector2D(
      -this.x, 
      -this.y
    );
  }

  perp(): Vector2D{
    return new Vector2D(
      this.y,
      -this.x
    );
  }

  set(vector: Vector2D): void{
    this.x = vector.x;
    this.y = vector.y;
  }

  toString():string{
    return `x:${this.x};y:${this.y}`;
  }

  equivalent(other: Vector2D): boolean{
    return this.x === other.x && this.y === other.y;
  }
}
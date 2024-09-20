export class Vector2D {
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
      newV.y = this.y += arg.y;
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
      newV.y = this.y -= arg.y;
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

  normalize() {
    if (this.length !== 0) {
      const length = this.length;
      this.x = this.x / length;
      this.y = this.y / length;
    }
  }
}

import * as ECS from "./ECS";
import { TransformComponent } from "./TransformComponent";
import { Rect } from "../utils";
import { Collision } from "../collision";
import {Emitter, Observer, CollisionEventArgs, EventArgs} from "../utils";
import { ctx } from "../graphics/ContextUtilities";

export class ColliderComponent extends ECS.Component implements Emitter {
  //implements Observer{
  public _colliderTag: string;
  public _colliderRect: Rect;
  public _className: string = "ColliderComponent";
  public observers: Observer[] = [];

  //public static _colliders : ColliderComponent[] = [];
  public _transform: TransformComponent;
  public _solid: boolean;
  
  constructor(
    entity: ECS.Entity,
    colliderType: string,
    colliderRect: Rect,
    solid: boolean,
  ) {
    super(entity);
    this.attach(entity);
    this.order = 0;
    this._colliderTag = colliderType;
    this._colliderRect = colliderRect;
    if (!this.entity.hasComponent(TransformComponent)) {
      this.entity.addComponent(TransformComponent, [0, 0], 0, 0, 0, 1);
    }
    this._solid = solid;
    this._transform = this.entity.getComponent(
      TransformComponent,
    ) as TransformComponent;
    this.entity.manager.addCollidable(this);
    //COLLISION_MANAGER.attach(this);
  }

  init() {}
  
  update() {
    this._colliderRect.x = this._transform.x - this._transform.offsetx;
    this._colliderRect.y = this._transform.y - this._transform.offsety;
    this._colliderRect.w = this._transform.width;
    this._colliderRect.h = this._transform.height;
    for (let other in this.entity.manager.collidables) {
      this.entity.manager.collidables[other].forEach((col) => {
        if (col !== this) {
          let check_collision = Collision.AABB(this, col);
          
          if (check_collision[0] && check_collision[1]) {
            const last_pos_x = this._transform.x - this._transform.Xmovment;
            const last_pos_y = this._transform.y - this._transform.Ymovment;
            const Xmov :number = this._transform.Xmovment;
            const Ymov:number = this._transform.Ymovment;

            /*if(Xmov > 0 && Ymov > 0){
              const nearest_point:number[] = [];
              const first = this.segment_intersection([this.get_top_right_corner()[0],this.get_top_right_corner()[1]], [this.get_bottom_right_corner()[0] + Xmov,this.get_bottom_right_corner()[1] + Ymov],[col.get_top_side()[0][0],col.get_top_side()[0][1]],[col.get_top_side()[0][0],col.get_top_side()[0][1]] );
            }*/
            this._transform.x = last_pos_x;
            this._transform.y = last_pos_y;
            this._colliderRect.x = this._transform.x - this._transform.offsetx;
            this._colliderRect.y = this._transform.y - this._transform.offsety;
            const eventArgs : CollisionEventArgs = {
              eventName:"collision",
                solid: check_collision[1],
                other: col,
            }
            this.notify<ColliderComponent,CollisionEventArgs >(this, eventArgs);
          }else if(check_collision[0]){
          const eventArgs : CollisionEventArgs = {
              eventName:"collision",
                solid: check_collision[1],
                other: col,
            }
            this.notify<ColliderComponent,CollisionEventArgs >(this, eventArgs);
            
          }
        }
      });
    }
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

  check_solid_collision(other: ColliderComponent): boolean {
    return this._solid && other._solid;
  }

  
  draw() {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.rect(this._colliderRect.x, this._colliderRect.y , this._colliderRect.w, this._colliderRect.h );
    ctx.stroke();
    ctx.fillStyle = "white";
  }
  /*
  notified(info:CollisionInfo){
    this.collisions.set(info.other, info.type);
  }*/
  get_bottom() {
    return this._colliderRect.y + this._colliderRect.h;
  }

  get_top() {
    return this._colliderRect.y;
  }

  get_left() {
    return this._colliderRect.x;
  }

  get_right() {
    return this._colliderRect.x + this._colliderRect.w;
  }

  set_bottom(value: number) {
    this._colliderRect.y = value - this._colliderRect.h;
  }

  set_top(value: number) {
    this._colliderRect.y = value;
  }

  set_left(value: number) {
    this._colliderRect.x = value;
  }

  set_right(value: number) {
    this._colliderRect.x = value - this._colliderRect.w;
  }

  get_right_side(): [[number, number], [number, number]] {
    return [
      [this._colliderRect.x + this._colliderRect.w, this._colliderRect.y],
      [
        this._colliderRect.x + this._colliderRect.w,
        this._colliderRect.y + this._colliderRect.h,
      ],
    ];
  }

  get_left_side(): [[number, number], [number, number]] {
    return [
      [this._colliderRect.x, this._colliderRect.y],
      [this._colliderRect.x, this._colliderRect.y + this._colliderRect.h],
    ];
  }
  get_top_side(): [[number, number], [number, number]] {
    return [
      [this._colliderRect.x, this._colliderRect.y],
      [this._colliderRect.x + this._colliderRect.w, this._colliderRect.y],
    ];
  }
  get_bottom_side(): [[number, number], [number, number]] {
    return [
      [this._colliderRect.x, this._colliderRect.y + this._colliderRect.h],
      [
        this._colliderRect.x + this._colliderRect.w,
        this._colliderRect.y + this._colliderRect.h,
      ],
    ];
  }

  get_top_left_corner(): [number, number] {
    return [this._colliderRect.x, this._colliderRect.y];
  }

  get_top_right_corner(): [number, number] {
    return [this._colliderRect.x + this._colliderRect.w, this._colliderRect.y];
  }

  get_bottom_left_corner(): [number, number] {
    return [this._colliderRect.x, this._colliderRect.y + this._colliderRect.h];
  }

  get_bottom_right_corner(): [number, number] {
    return [
      this._colliderRect.x + this._colliderRect.w,
      this._colliderRect.y + this._colliderRect.h,
    ];
  }

  segment_intersection(
    A: [number, number],
    B: [number, number],
    C: [number, number],
    D: [number, number],
  ): [boolean, [number, number]] {
    const Ax = A[0];
    const Ay = A[1];
    const Bx = B[0];
    const By = B[1];
    const Cx = C[0];
    const Cy = C[1];
    const Dx = D[0];
    const Dy = D[1];

    let Sx: number;
    let Sy: number;
    let intersect: boolean;

    if (Cx === Dx) {
      if (Ax === Dx) return [false, [0, 0]];
      else {
        const pCD = (Ay - By) / (Ax - Bx);
        Sx = Cx;
        Sy = pCD * (Cx - Ax) + Ay;
        intersect = true;
      }
    } else if (Cy === Dy) {
      if (Ay === Dy) return [false, [0, 0]];
      else {
        const pCD = (Ay - By) / (Ax - Bx);
        Sx = pCD * (Cy - Ay) + Ax;
        Sy = Cy;
        intersect = true;
      }
    } else {
      if (Ax === Bx) {
        let pAB = (Cy - Dy) / (Cx - Dx);
        Sx = Ax;
        Sy = pAB * (Ax - Cx) + Cy;
        intersect = true;
      } else {
        let pCD = (Ay - By) / (Ax - Bx);
        let pAB = (Cy - Dy) / (Cx - Dx);
        let oCD = Ay - pCD * Ax;
        let oAB = Cy - pAB * Cx;
        Sx = (oAB - oCD) / (pCD - pAB);
        Sy = pCD * Sx + oCD;
        intersect = true;
      }
    }
    if (
      (Sx < Cx && Sx < Dx) ||
      (Sx > Cx && Sx > Dx) ||
      (Sx < Ax && Sx < Bx) ||
      (Sx > Ax && Sx > Bx) ||
      (Sy < Cy && Sy < Dy) ||
      (Sy > Cy && Sy > Dy) ||
      (Sy < Ay && Sy < By) ||
      (Sy > Ay && Sy > By)
    )
      return [false, [0, 0]];
    return [intersect, [Sx, Sy]];
  }

  public destroy():void{
    this.entity.manager.removeCollidable(this);
  }


}

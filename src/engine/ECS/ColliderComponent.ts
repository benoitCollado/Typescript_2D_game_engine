/*import * as ECS from "./ECS";
import { TransformComponent } from "./TransformComponent";
import { Rect } from "../utils";
import { Collision } from "../collision";
import {Emitter, Observer, CollisionEventArgs, EventArgs} from "../utils";
import { ctx } from "../graphics/ContextUtilities";
import { Vector2D } from "../vector2D";

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
  
  update(deltaTime:number) {
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
   /* 
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
  
  getVertices(): Vector2D[] {
      return [
          new Vector2D(this._transform.x, this._transform.y),
          new Vector2D(this._transform.x + this._transform.width, this._transform.y),
          new Vector2D(this._transform.x + this._transform.width, this._transform.y + this._transform.height),
          new Vector2D(this._transform.x, this._transform.y + this._transform.height),
      ];
  }

  
  
  draw() {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.rect(this._colliderRect.x, this._colliderRect.y,this._colliderRect.w, this._colliderRect.h);
    ctx.stroke();
  }
  /*
  notified(info:CollisionInfo){
    this.collisions.set(info.other, info.type);
  }*/


/*

  public destroy():void{
    this.entity.manager.removeCollidable(this);
  }


}
*/
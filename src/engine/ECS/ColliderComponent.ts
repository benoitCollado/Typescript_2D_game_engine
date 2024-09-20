import * as ECS from "./ECS"
import { Rect } from "../utils"
import { TransformComponent } from "./TransformComponent";
import { Collision } from "../collision";

export class ColliderComponent extends ECS.Component{
  public _colliderTag: string;
  public _colliderRect: Rect;
  public _className: string = "ColliderComponent";
  public static _colliders : ColliderComponent[] = [];
  public _transform: TransformComponent;
  constructor(entity: ECS.Entity, colliderType: string, colliderRect: Rect) {
    super(entity);
    this._colliderTag = colliderType;
    this._colliderRect = colliderRect;
    if(!this.entity.hasComponent("TransformComponent")){
      this.entity.addComponent(TransformComponent, [0,0], 0, 0, 0, 1);
    }

    this._transform = this.entity.getComponent("TransformComponent") as TransformComponent;
    
    ColliderComponent._colliders.push(this);
  }
  
  init(){} 
  update(){
    this._colliderRect.x = this._transform.x;
    this._colliderRect.y = this._transform.y;
    this._colliderRect.w = this._transform.width;
    this._colliderRect.h = this._transform.height;

    /*ColliderComponent._colliders.forEach(collider => {
      if(collider !== this){
        if(Collision.AABB(this, collider)){
          this._transform._velocity.x = 0;
          this._transform._velocity.y = 0;
        }
      }
    })
    */
  }
  draw(){}
}
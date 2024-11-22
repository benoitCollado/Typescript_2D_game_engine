import { ColliderComponent } from "./ECS/ColliderComponent";

export interface Iconstructor<T>{
    new(...args:any[]):T;
  }

export interface Rect{
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Emitter{
  attach(observer:Observer):void;
  detach(observer:Observer):void;
  notify():void;
}

export interface Observer{
  
  notified(info: CollisionInfo ):void;
}

export interface CollisionInfo{
  other: ColliderComponent;
  type: string;
}

//export const COLLISION_MANAGER = new CollisionManager();
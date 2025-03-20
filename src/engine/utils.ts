//import { ColliderComponent } from "./ECS/ColliderComponent";

export interface Iconstructor<T> {
  new (...args: any[]): T;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Emitter {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify<T extends Emitter, U extends EventArgs>(emitter: T, Args: U): void;
  observers: Observer[];
}

export interface EventArgs {
  eventName: string;
}
/*export interface CollisionEventArgs extends EventArgs {
  solid: boolean;
  other: ColliderComponent;
}*/

export interface Observer {
  notified<T extends Emitter, U extends EventArgs>(emitter : T, Args : U): void;
}

/*export interface CollisionInfo{
  other: ColliderComponent;
  type: string;
}*/

//export const COLLISION_MANAGER = new CollisionManager();

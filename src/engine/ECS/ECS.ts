import { Iconstructor, Observer, Emitter, EventArgs } from "../utils";
import { ColliderComponent } from "./ColliderComponent";

export abstract class Component {
  public abstract _className: string;

  public entity: Entity;
  public order: number = 0;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  abstract init(): void;
  abstract update(): void;
  abstract draw(): void;
  public destroy(): void{
    
  };
}

export class Entity implements Observer{
  protected active: boolean;
  protected components: Component[] = [];
  protected componentsName: string[] = [];
  public name: string;

  public manager: Manager;

  constructor(manager: Manager, name: string) {
    this.active = true;
    this.manager = manager;
    this.name = name;
  }

  public init() {}

  public update(): void {
    const componentsValues = Object.values(this.components);
    componentsValues.forEach((component) => component.update());
  }

  public draw(): void {
    const componentsValues = Object.values(this.components);
    componentsValues.forEach((component) => component.draw());
  }

  public addComponent<T extends Component>(
    type: Iconstructor<T>,
    ...args: any
  ): T {
    const component = new type(this, ...args);
    if (this.componentsName.includes(component._className)) {
      this.components.forEach((comp) => {
        if (comp._className === component._className) {
          return comp as T;
        }
      });
    } else {
      ("component added");
      this.components.push(component);
      this.componentsName.push(component._className);
    }
    this.components.sort((a, b) => b.order - a.order);
    return component;
  }

  public hasComponent<T extends Component>(type: Iconstructor<T>): boolean {
    let present = false;
    this.components.forEach((component) => {
      if (component instanceof type) {
        present = true;
      }
    });
    return present;
  }

  public getComponent<T extends Component>(
    type: Iconstructor<T>,
  ): T | undefined {
    let returnComponent: T | undefined;
    this.components.forEach((component) => {
      if (component instanceof type) {
        returnComponent = component as T;
      }
    });
    return returnComponent;
  }

  notified<T extends Emitter, U extends EventArgs>(emitter: T, Args:U): void {}

  destroy(){
    this.active = false;
    this.components.forEach((component) => {
      component.destroy();
    });
    this.components = [];
    this.componentsName = [];
    this.manager.removeEntity(this);
  }

  public isActive(): boolean{
      return this.active;
  }
}

export class Manager {
  public entities: { [name: string]: Entity[] } = {
    default: [new Entity(MANAGER, "default")],
  };
  public collidables: { [name: string]: ColliderComponent[] } = {};
  public update(): void {
    const entitiesValues = Object.values(this.entities);
    entitiesValues.forEach((entity) => {
      entity.forEach((entiti) => {
        if (entiti.isActive()) {
          entiti.update();
        }
           });;
    });;
  }

 
  
  public draw(): void {
    const entitiesValues = Object.values(this.entities);
    entitiesValues.forEach((entity) => {
      entity.forEach((entiti) => {
        if(entiti.isActive()){
          entiti.draw()
        }});
    });
  }

  public addEntity(entity: Entity): void {
    if (this.entities[entity.name]) {
      if (this.entities[entity.name].includes(entity)) {
      } else {
        this.entities[entity.name].push(entity);
      }
    } else {
      this.entities[entity.name] = [entity];
    }
  }
  public removeEntity(entity: Entity): void{
    this.entities[entity.name].forEach(entitie =>{
      if(entitie === entity){
        this.entities[entity.name].splice(this.entities[entity.name].indexOf(entitie), 1);
      }
    });
  }

  public addCollidable(collider: ColliderComponent): void {
    if (this.collidables[collider._colliderTag]) {
      if (this.collidables[collider._colliderTag].includes(collider)) {
      } else {
        this.collidables[collider.entity.name].push(collider);
      }
    } else {
      this.collidables[collider.entity.name] = [collider];
    }
  }

  public removeCollidable(collider: ColliderComponent): void{   this.collidables[collider.entity.name].splice(this.collidables[collider.entity.name].indexOf(collider), 1);
  }
}

export const MANAGER = new Manager();

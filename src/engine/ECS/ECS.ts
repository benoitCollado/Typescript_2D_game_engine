import { Iconstructor } from "../utils";
import{ TransformComponent } from "./TransformComponent";      
export abstract class Component {
  public abstract _className: string;

  protected entity: Entity;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  abstract init(): void;
  abstract update(): void;
  abstract draw(): void;
}

export class Entity {
  protected active: boolean;
  protected components: { [name: string]: Component } = {};
  public name: string;

  protected manager: Manager;

  constructor(manager: Manager, name: string) {
    this.active = true;
    this.manager = manager;
    this.name = name;
  }

  public init(){
    
  }

  public update(): void {
    const componentsValues = Object.values(this.components);
    componentsValues.forEach((component) => component.update());
    if(this.name === "player"){
      const transform = this.components["TransformComponent"] as TransformComponent;
      console.log("transform : " + transform.x + " " + transform.y);
    }
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
    if (this.components[component._className] !== undefined) {
      console.log(
        this + " already has a component of type " + component._className,
      );
    } else {
      this.components[component._className] = component;
    }
    return component;
  }

  public hasComponent(componentName: string): boolean {
    if (this.components[componentName] !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  public getComponent<T extends Component>(className: string): T {
    return this.components[className] as T;
  }
}

export class Manager {
  public entities: { [name: string]: Entity } = {};

  public update(): void {
    const entitiesValues = Object.values(this.entities);
    entitiesValues.forEach((entity) => entity.update());
  }

  public draw(): void {
    const entitiesValues = Object.values(this.entities);
    //console.log(this.entities);
    entitiesValues.forEach((entity) => {
      //console.log("dans les forEach");
      //console.log(entity);
      entity.draw();
    });
  }

  public addEntity(entity: Entity):void{
    /*const entity = new Entity(this, name);*/
    console.log("addentity : ");
    console.log(entity);
    if (this.entities[entity.name] !== undefined) {
      //throw new Error("Entity with this name alreade exist");
      console.log("Entity with this name alreade exist");
    } else {
      this.entities[entity.name] = entity;
    }
    //return entity;
  }
}

export const MANAGER = new Manager();

import { Iconstructor } from "../utils";
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
}

export class Entity {
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
      console.log(
        this.name + " already has a component of type " + component._className,
      );
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
      console.log(component instanceof type);
      if (component instanceof type) {
        console.log("ici");
        present = true;
      }
    });
    console.log("bahaha");
    return present;
  }

  public getComponent<T extends Component>(
    type: Iconstructor<T>,
  ): T | undefined {
    let returnComponent: T | undefined;
    this.components.forEach((component) => {
      console.log(component instanceof type);
      if (component instanceof type) {
        console.log(component);
        returnComponent = component as T;
      }
    });
    return returnComponent;
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
      entity.forEach((entiti) => entiti.update());
    });
  }

  public draw(): void {
    const entitiesValues = Object.values(this.entities);
    entitiesValues.forEach((entity) => {
      entity.forEach((entiti) => entiti.draw());
    });
  }

  public addEntity(entity: Entity): void {
    console.log("addEntity : ");
    console.log(entity);

    console.log(this.entities);
    if (this.entities[entity.name]) {
      if (this.entities[entity.name].includes(entity)) {
        console.log("Entity with this name alreade exist");
      } else {
        this.entities[entity.name].push(entity);
      }
    } else {
      this.entities[entity.name] = [entity];
    }
  }
  public removeEntity(entity: Entity): void{
    console.log("removeEntity : ");
    console.log(entity);

    console.log(this.entities);
    this.entities[entity.name].forEach(entitie =>{
      if(entitie === entity){
        this.entities[entity.name].splice(this.entities[entity.name].indexOf(entitie), 1);
      }
    });
  }

  public addCollidable(collider: ColliderComponent): void {
    console.log("Add Collidable");
    console.log(collider);
    if (this.collidables[collider._colliderTag]) {
      if (this.collidables[collider._colliderTag].includes(collider)) {
        console.log("Collidable alreadey exist");
      } else {
        this.collidables[collider.entity.name].push(collider);
      }
    } else {
      this.collidables[collider.entity.name] = [collider];
    }
    console.log("collidables");
    console.log(this.collidables);
  }
}

export const MANAGER = new Manager();

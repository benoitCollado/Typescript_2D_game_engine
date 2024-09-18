import { Iconstructor } from "../utils";

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
  private active: boolean;
  private components: { [name: string]: Component } = {};
  public name: string;

  private manager: Manager;

  constructor(manager: Manager, name: string) {
    this.active = true;
    this.manager = manager;
    this.name = name;
  }

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
  ): void {
    const component = new type(this, ...args);
    if (this.components[component._className] !== undefined) {
      console.log(
        this + " already has a component of type " + component._className,
      );
    } else {
      this.components[component._className] = component;
    }
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

  public addEntity(name: string): Entity {
    const entity = new Entity(this, name);
    console.log("addentity : ");
    console.log(entity);
    if (this.entities[name] !== undefined) {
      throw new Error("Entity with this name alreade exist");
    } else {
      this.entities[name] = entity;
    }
    return entity;
  }
}

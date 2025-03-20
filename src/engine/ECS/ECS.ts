import { Iconstructor, Observer, Emitter, EventArgs } from "../utils";
import { BodyComponent } from "./BodyComponent";
import SAT from "../SAT";
//import { ColliderComponent } from "./ColliderComponent";

export abstract class Component {
  public abstract _className: string;

  public entity: Entity;
  public order: number = 0;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  abstract init(): void;
  abstract update(deltaTime: number): void;
  abstract draw(): void;
  public destroy(): void{
    
  };
}

export class Entity implements Observer{
  protected active: boolean;
  protected components: Component[] = [];
  protected componentsName: string[] = [];
  public name: string;
  public id : string;

  public manager: Manager;

  constructor(manager: Manager, name: string) {
    this.active = true;
    this.manager = manager;
    this.name = name;
    this.id = Date.now().toString();
  }

  public init() {}

  public update(deltaTime:number): void {
    const componentsValues = Object.values(this.components);
    componentsValues.forEach((component) => component.update(deltaTime));
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
      component.init();
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
  public collidables: BodyComponent[] = [];
  
  public update(deltaTime:number): void {
    const entitiesValues = Object.values(this.entities);
    entitiesValues.forEach((entity) => {
      entity.forEach((entiti) => {
        if (entiti.isActive()) {
          entiti.update(deltaTime);
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

  public update_collision(): void{
    for(let collider of this.collidables){
      for(let other of this.collidables){
        if(collider === other){
          }else{
            let mtv = SAT(collider, other);
            if(mtv !== null){
              if(collider.velocity.length){
                if(other.velocity.length){
                  collider.position = collider.position.add(mtv.multiply(0.5))
                  other.position = other.position.substract(mtv.multiply(0.5));
                }else{
                  collider.position = collider.position.substract(mtv)
                }
                
              }else{
                other.position = other.position.add(mtv);
              }
            }
          }
      }
    }
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

  public addCollidable(collider: BodyComponent): void {
      if(this.collidables.includes(collider)) {
        
      } else {
        this.collidables.push(collider);
      }
  }
   
  public removeCollidable(collider: BodyComponent): void{   this.collidables.splice(this.collidables.indexOf(collider), 1);
  }
}

export const MANAGER = new Manager();

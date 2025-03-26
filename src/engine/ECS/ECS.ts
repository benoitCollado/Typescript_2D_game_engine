import { Iconstructor, Observer, Emitter, EventArgs, CollisionEventArgs } from "../utils";
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
  abstract beforeUpdate():void;
  abstract update(deltaTime: number): void;
  abstract draw(): void;
  abstract beforeNextFrame():void;
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

  public init() {
    const componentsValues = Object.values(this.components);
    componentsValues.forEach((component) => component.init());
  }

  public beaforUpdate(){
    const componentsValues = Object.values(this.components);
    componentsValues.forEach((component) => component.beforeUpdate());
  }

  public update(deltaTime:number): void {
    const componentsValues = Object.values(this.components);
    componentsValues.forEach((component) => component.update(deltaTime));
  }

  public draw(): void {
    const componentsValues = Object.values(this.components);
    componentsValues.forEach((component) => component.draw());
  }

  public beforeNextFrame(): void{
    const componentsValues = Object.values(this.components);
    componentsValues.forEach((component) => component.beforeNextFrame());
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

  constructor(){
    this.init();
  }
  
  public runGame(deltatime:number):void{
    this.beforeUpdate();
    this.update(deltatime);
    this.update_collision();
    this.draw();
    this.beforeNextFrame();
  }

  public init(): void{
    const entitiesValues = Object.values(this.entities);
    entitiesValues.forEach((entity) => {
      entity.forEach((entiti) => {
        if (entiti.isActive()) {
          entiti.init();
        }
           });;
    });;
    console.log(this.collidables);
  }

  public beforeUpdate():void{
     const entitiesValues = Object.values(this.entities);
      entitiesValues.forEach((entity) => {
        entity.forEach((entiti) => {
          if (entiti.isActive()) {
            entiti.beaforUpdate();
          }
             });;
      });;
  }
  
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
           // console.log(collider.entity.name  + "  " + other.entity.name)
           // console.log("    ");
            let mtv = SAT(collider, other);
            //if(mtv !== null) console.log(collider._className + " " + other._className);
            if(mtv !== null){
              collider.notify<BodyComponent, CollisionEventArgs>(collider, {
                eventName: "collision",
                type:"trigger",
                other:other
              });
              other.notify<BodyComponent, CollisionEventArgs>(other, {
                eventName: "collision",
                type:"trigger",
                other:collider
              })
              if(collider.solid && other.solid){
                console.log(collider.entity.name + "  " + other.entity.name)
                const moveC = collider.velocity;
                const moveO = other.velocity;
  
                const magnC = moveC.length;
                const magnO = moveO.length;
  
                if(magnC > 0){
                  const dotC = mtv.dot(moveC);
                  const sens = dotC  > 0 ? -1 : 1;
                  collider.position = collider.position.add(mtv.multiply(sens));
                }
  
                if(magnO > 0){
                  const dotO = mtv.dot(moveO);
                  const sens = dotO > 0 ? -1 : 1;
                  other.position = other.position.add(mtv.multiply(sens));
                }
                
              }
            }
          }
      }
    }
  }

  public beforeNextFrame():void {
     const entitiesValues = Object.values(this.entities);
      entitiesValues.forEach((entity) => {
        entity.forEach((entiti) => {
          if (entiti.isActive()) {
            entiti.beforeNextFrame();
          }
             });;
      });;
  }

  public addEntity(entity: Entity): void {
    if (this.entities[entity.name]) {
      if (this.entities[entity.name].includes(entity)) {
      } else {
        this.entities[entity.name].push(entity);
      }
    } else {
      entity.init();
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

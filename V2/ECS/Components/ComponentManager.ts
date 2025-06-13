import { EntityId } from "../EntityManager";
import {ComponentType, Component} from "./Component";
import ComponentFactory from "./ComponentFactory";

export default class ComponentManager{
  //stockage des composents par type
  private components : Map<ComponentType, Map<EntityId, Component>> = new Map();
  public factory: ComponentFactory;

  constructor(){
    //Initialisation des maps pour chaque type de composant
    this.factory = new ComponentFactory(this);
    this.components.set(ComponentType.Transform, new Map());
    this.components.set(ComponentType.Velocity, new Map());
    this.components.set(ComponentType.Render, new Map());
    this.components.set(ComponentType.Grid, new Map());
    this.components.set(ComponentType.PlayerController, new Map());
    this.components.set(ComponentType.Input, new Map());
    this.components.set(ComponentType.TileMap, new Map());
  }

  addComponent<T extends Component>(entity: EntityId, type: ComponentType, component: T): void{
    const componentTypeMap = this.components.get(type);
    if(componentTypeMap){
      componentTypeMap.set(entity, component);
    }
  }

  getComponent(entity: EntityId, type: ComponentType): Component | undefined{
    const componentTypeMap = this.components.get(type);
    if(componentTypeMap){
      return componentTypeMap.get(entity);
    }
    return undefined;
  }

  hasComponent(entity: EntityId, type: ComponentType) : boolean{
    const compoentTypeMap = this.components.get(type);
    return compoentTypeMap ? compoentTypeMap.has(entity) : false;
  }

  removeComponent(entity: EntityId, type: ComponentType): void{
    const componentTypeMap = this.components.get(type);
    if(componentTypeMap){
      componentTypeMap.delete(entity);
    }
  }

  removeAllComponents(entity: EntityId): void{
    for(const[_, componentMap] of this.components){
      componentMap.delete(entity);
    }
  }

  getEntitiesWithComponents(types: ComponentType[]): EntityId[]{
    let result: EntityId[] = [];
    if(types.length > 0){
      const firstType = types[0];
      const firstComponentMap = this.components.get(firstType);

      if(firstComponentMap){
        result = Array.from(firstComponentMap.keys());
        for(let i = 1; i < types.length; i++){
          const type = types[i];
          result = result.filter(entity => this.hasComponent(entity, type));
        }
      }
    }

    return result;
  }
}
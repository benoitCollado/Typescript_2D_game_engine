import { AnimationStateComponent, ComponentType } from "../Components/Component";
import ComponentManager from "../Components/ComponentManager";
import { EntityManager } from "../EntityManager";
import { EventMessage, EventType, StateEventMEssage } from "../Event/Event";
import EventQueue from "../Event/EventQueue";
import { System } from "./System";

export default class AnimationSystem extends System{

  constructor(entityManager: EntityManager, componentManager: ComponentManager, eventQueue: EventQueue<EventType,EventMessage>){
    super(entityManager, componentManager, eventQueue);
  }

  update(deltaTime: number): void {

    const stateEvents = this.eventQueue.getEventsType(EventType.State) as StateEventMEssage[];
    
    const animationsEntities = this.componentManager.getEntitiesWithComponents([
      ComponentType.Render,
      ComponentType.AnimationState
    ]);
    
  if(stateEvents && animationsEntities){
    animationsEntities.forEach(entity=>{
      const animationStateComponent = this.componentManager.getComponent(entity,ComponentType.AnimationState) as AnimationStateComponent; 
      const entityStateEvents = stateEvents.filter(event => event.entity === entity);
      if(entityStateEvents){
        for(let entityStateEvent of entityStateEvents){
          
        }
      }
    });
  }
  }
  
}
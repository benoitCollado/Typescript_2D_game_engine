import ComponentManager from "../Components/ComponentManager";
import { EntityManager } from "../EntityManager";
import { EventMessage, EventType } from "../Event/Event";
import EventQueue from "../Event/EventQueue";

export abstract class System{
  protected componentManager: ComponentManager;
  protected entityManager: EntityManager;
  protected eventQueue: EventQueue<EventType, EventMessage>;

  constructor(entityManager: EntityManager, componentManager: ComponentManager, eventQueue: EventQueue<EventType,EventMessage>){
    this.entityManager = entityManager;
    this.componentManager = componentManager;
    this.eventQueue = eventQueue;
  }
  
  abstract update(deltaTime: number):void;
  init(){
    
  }
}
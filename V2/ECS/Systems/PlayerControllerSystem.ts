import { ComponentType, InputComponent, PlayerControllerComponent, InputType } from "../Components/Component";
import ComponentManager from "../Components/ComponentManager";
import { EntityManager } from "../EntityManager";
import { System } from "./System";
import EventQueue from "../Event/EventQueue";
import { ActionEventMessage, EventMessage, EventType, InputEventMessage } from "../Event/Event";
import ActionMapping from "../utils/ActionMapping";


export default class PlayerControllerSystem extends System{

  constructor(entityManager: EntityManager, componentManager: ComponentManager, eventQueue: EventQueue<EventType, EventMessage>){
    super(entityManager, componentManager, eventQueue);
  }
  
  update(deltaTime: number): void {

    const entities = this.componentManager.getEntitiesWithComponents([
      ComponentType.PlayerController
    ]);

  for(const entity of entities){
    const PlayerComponent = this.componentManager.getComponent(entity, ComponentType.PlayerController) as PlayerControllerComponent;

    PlayerComponent.currentActions = [];
    const inputMethodsSupport: InputType[] = []
    const inputMethodsSupportIter = PlayerComponent.actionsMapping.keys();
    for(let i = 0; i < PlayerComponent.actionsMapping.size ; i++ ){
      inputMethodsSupport.push(inputMethodsSupportIter.next().value as InputType);
    }
    
    const inputEvents = this.eventQueue.getEventsType(EventType.Input) as InputEventMessage[];
    if(inputEvents){
    for(let i = 0 ; i < inputMethodsSupport.length; i++){
      const eventsOnInputMethod : InputEventMessage[] = inputEvents.filter(event => event.inputMethod === inputMethodsSupport[i]);
      const mapping : ActionMapping = PlayerComponent.actionsMapping.get(inputMethodsSupport[i]) as ActionMapping;
      eventsOnInputMethod.forEach(event => {
        if(mapping.actionMapping.has(event.keyCode)){
          const keymapping = mapping.actionMapping.get(event.keyCode) 
          if(keymapping && keymapping.status === event.status){
            this.eventQueue.emit(EventType.Action, {
              eventType: EventType.Action,
              actionName: keymapping.action,
              entity: entity
            } as ActionEventMessage);
          }
        }
      });
    }
   }
  }
  }
}
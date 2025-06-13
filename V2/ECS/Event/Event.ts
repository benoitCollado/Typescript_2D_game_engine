import {InputType} from "../Components/Component"
import { EntityId } from "../EntityManager";
import { KeyState } from "../utils/InputController";


export interface EventMessage{
  eventType: EventType;
}

export interface InputEventMessage extends EventMessage{
  inputMethod: InputType;
  keyCode: string;
  status: string;
}

export interface ActionEventMessage extends EventMessage{
  actionName : string;
  entity: EntityId;
}

export interface StateEventMessage<T> extends EventMessage {
  stateName :T;
  entity: EntityId;
}


export enum EventType{
  Input,
  Action,
  State,
}

export enum GridStateEventType{
  Move,
  MoveFailed,
  Attack,
  AttackFailed,
  StopMoving,
  StopAttacking,
}




import { EntityId } from "../EntityManager";
import { EventType } from "../Event/Event";

export interface HierarchicalState{
  name:string;
  children?:HierarchicalState[];
  onEnter?:()=>void;
  onExist?:()=>void;
}

export interface HierarchicalTransition {
  from:string;
  to:string;
  condition:(event: EventType.State)=>boolean;
}



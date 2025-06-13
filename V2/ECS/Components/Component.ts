//composants ne comportant que des des données
import InputController from "../utils/InputController";
import ActionMapping from "../utils/ActionMapping";
import Shape from "../utils/Shape";
import Vector2D from "../utils/Vector2D";
import LinearInterpolation from "../utils/LinearInterpolation";
import Texture from "../utils/Texture";
import Layer from "../utils/Layer";
import Behavior from "../utils/Behaviors/Behavior";
import { Animation2D, AnimationState } from "../utils/Animation";

export interface Component {
  componentName:string;
}

export interface TransformComponent extends Component{
  position: Vector2D;
  rotation: number;
  scale: number;
}

export interface VelocityComponent extends Component{
  velocity: Vector2D;
}

export interface RenderComponent extends Component{
  animations: Map<string,Animation2D>;
  currentAnimation: string;
  /*
  color: string;
  shape: 'circle'| 'rectangle';
  width: number;
  height: number;
  */
}

export interface ColliderComponent extends Component{
  shape: Shape;
  solid: boolean;
  kinematic: boolean;
  static: boolean;
}

export interface InputComponent extends Component{
   inputMethods: InputController[];
}

export interface PlayerControllerComponent extends Component{
  actionsPossibles:string[];
  currentActions: string[];
  actionsMapping: Map<InputType,ActionMapping<>>;
}

export interface BehaviorComponent extends Component{
  behaviorStrategy: Behavior;
  behaviorType : BehaviorType;
  
}

export interface GridComponent extends Component{
  isMoving: boolean;
  blocking: boolean;
  speed: number;
  delayAction: number;
  currentDelay: number;
  canAct: boolean;
  interpolation: LinearInterpolation;
}

export interface TurnComponent extends Component{
  status: "waiting" | "currentTurn";
  //turnPhase: "moving" | ""
}
export interface TileMapComponent extends Component{
  cellSize: Vector2D;
  layers : Map<string,Layer>;
  textures: Map<number, Texture>;
  collisionMask: number[][];
}

export interface AnimationStateComponent extends Component{
  currentState:string;
  
}

export enum InputType{
  KeyBoard,
  Mouse,
  GamePad,
  Touch
}

export enum BehaviorType{
  GridMovement,
  EightDirection,
  PlatformMovement,
}


// type des composants
export enum ComponentType{
  Transform,
  Velocity,
  Render,
  Collider2D,
  Input,
  PlayerController,
  Grid,
  Turn,
  TileMap,
  AnimationState,
}
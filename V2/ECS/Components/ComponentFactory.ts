import {EntityId} from "../EntityManager";
import * as Cp from "./Component";
import Vector2D from "../utils/Vector2D";
import Shape from "../utils/Shape";
import ComponentManager from "./ComponentManager";
import KeyBoardController from "../utils/KeyboardController"
import ActionMapping from "../utils/ActionMapping";
import LinearInterpolation from "../utils/LinearInterpolation";
import Layer from "../utils/Layer";
import Texture from "../utils/Texture";
import { Animation2D, AnimationState, State } from "../utils/Animation";
import PolygonTexture from "../utils/PolygonTexture";
import { HierarchicalState, HierarchicalTransition } from "../utils/State";
import { rootCertificates } from "tls";

export default class ComponentFactory{
  private componentManager: ComponentManager;

  constructor(componentManager: ComponentManager){
    this.componentManager = componentManager;
  }

  createComponent(entity: EntityId, type: Cp.ComponentType): Cp.Component{
    let component: Cp.Component;

    switch(type){
      case Cp.ComponentType.Transform:
        component = this.createTransformComponent(entity);
        break;
      case Cp.ComponentType.Velocity:
        component = this.createVelocityComponent(entity);
        break;
      case Cp.ComponentType.Render:
        component = this.createRenderComponent(entity);
        break;
      case Cp.ComponentType.Collider2D:
        component = this.createCollider2DComponent(entity);
        break;
      case Cp.ComponentType.Input:
        component = this.createInputComponent(entity);
        break;
      case Cp.ComponentType.PlayerController:
        component = this.createPlayerControllerComponent(entity);
        break;
      case Cp.ComponentType.Grid:
        component = this.createGridComponent(entity);
        break;
      case Cp.ComponentType.TileMap:
        component = this.createTileMapComponent(entity);
        break;
      case Cp.ComponentType.AnimationState:
        component = this.createAnimationStateComponent(entity);
        break;
      default:
        throw new Error(`Type de composant non supporté : ${type} `);
    }

    //this.componentManager.addComponent(entity, type, component);
    return component;
  
  }

  createTransformComponent(entity: EntityId, x: number = 0, y: number = 0, rotation: number = 0, scale: number = 1) : Cp.Component{
    const component : Cp.TransformComponent = {
      componentName:'transform',
      position : new Vector2D(x,y),
      rotation: rotation,
      scale: scale
    } 

    this.componentManager.addComponent(entity, Cp.ComponentType.Transform, component);
    return component;
  }

  createVelocityComponent(entity: EntityId, x: number = 0, y: number = 0) : Cp.Component {
    const component : Cp.VelocityComponent = {
      componentName:"velocity",
      velocity : new Vector2D(x,y)
    }

    this.componentManager.addComponent(entity, Cp.ComponentType.Velocity, component);
    return component;
  }

  createRenderComponent(entity: EntityId, animations: Map<string,Animation2D> = new Map(), currentAnimation: string = "state0"): Cp.Component{
    if(animations.size ===0){
      const defaultTexture = new Texture(new PolygonTexture());
      const defaultAnimation = new Animation2D("state0", [defaultTexture], [0])
      animations.set("state0", defaultAnimation);
    }
    const component : Cp.RenderComponent = {
      componentName:'render',
      animations: animations,
      currentAnimation: currentAnimation
    }

    this.componentManager.addComponent(entity, Cp.ComponentType.Render, component);
    return component;
  }

  
  createCollider2DComponent(entity: EntityId, shape: Shape = new Shape([new Vector2D(0,0), new Vector2D(10,0), new Vector2D(10,10), new Vector2D(0,10)], new Vector2D(5,5)), solid: boolean = false, kinematic = true, staticCollider: boolean = false){
    const component: Cp.ColliderComponent = {
      componentName : "collider2D",
      shape : shape,
      solid : solid,
      kinematic : kinematic,
      static : staticCollider
    }

    this.componentManager.addComponent(entity, Cp.ComponentType.Collider2D, component);
    return component
  }

  createInputComponent(entity: EntityId, inputMethods: Cp.InputType[] = [Cp.InputType.KeyBoard] ): Cp.Component{
    const component: Cp.InputComponent = {
      componentName:"input",
      inputMethods : []
     }

    inputMethods.forEach(inputMethod =>{
      switch(inputMethod){
        case Cp.InputType.KeyBoard :
          component.inputMethods.push(new KeyBoardController());
          break;
        case Cp.InputType.Mouse:
          break;
        case Cp.InputType.GamePad:
          break;
        case Cp.InputType.Touch:
          break;
        default:
          break;
      }
    })

    this.componentManager.addComponent(entity, Cp.ComponentType.Input, component);
    return component;
  }

  createPlayerControllerComponent(entity:EntityId, actionPossibles:string[] = ["left", "right", "up", "down"], currentActions:string[]= [], actionsMapping: Map<Cp.InputType,ActionMapping> = new Map()): Cp.Component{
    if(Object(actionsMapping).keys.length === 0){
      actionsMapping.set(Cp.InputType.KeyBoard, new ActionMapping({"z":{action:"up", status:"justPressed"},"q":{action:"left", status:"justPressed"},"s":{action:"down", status:"justPressed"},"d":{action:"right",status:"justPressed"}}));
    }

    const component : Cp.PlayerControllerComponent = {
      componentName : "playerController",
      actionsPossibles : actionPossibles,
      actionsMapping : actionsMapping,
      currentActions : []
    }

    this.componentManager.addComponent(entity, Cp.ComponentType.PlayerController, component);
    return component;
  }

  createGridComponent(entity: EntityId, isMoving: boolean = false, speed: number = 1, blocking = false, delayAction: number = 0.125, currentDelay: number = 0, canAct: boolean = true){
    const component : Cp.GridComponent = {
      componentName : "Grid",
      blocking: blocking,
      isMoving: isMoving,
      speed :speed,
      delayAction: delayAction,
      currentDelay: currentDelay,
      canAct: canAct,
      interpolation : new LinearInterpolation()
    }

    this.componentManager.addComponent(entity, Cp.ComponentType.Grid, component);
    return component;
    
  }

  createTileMapComponent(entity: EntityId, cellSize: Vector2D = new Vector2D(10,10), layers: Map<string,Layer> = new Map(), textures: Map<number, Texture> = new Map(), collisionMask: number[][] = []  ): Cp.Component{
    const component :Cp.TileMapComponent = { 
      componentName:"tilemap",
      cellSize: cellSize,
      layers : layers,
      textures: textures,
      collisionMask: collisionMask
    }

    this.componentManager.addComponent(entity, Cp.ComponentType.TileMap, component);
    return component;
  }

  private states : HierarchicalState = {
    name: 'Root',
    children: [
      {
        name:'Idle',
      },
      {
        name:'Walk'
      },
      {
        name:'TakeDamage'
      },
      {
        name:'Attack'
      },
      {
        name:'Died'
      }   
    ]
  }

  private transition : HierarchicalTransition[]=[
    {from:"Idle", to:"Walk",condition: e => e.stateName}
  ]
  
  createStateComponent(entity: EntityId, animationStates: HierarchicalState = this.states,transitions: HierarchicalTransition[], currentState: string = "idle"): Cp.Component{
    if(animationStates.size === 0){
      const state : AnimationState = {
        name: "state0",
      animationStates.set(currentState,state);
    }
    const stateComponent : Cp.AnimationStateComponent = {
      componentName:"animationState",
      currentState: currentState,
      animationStates: animationStates
    }

    this.componentManager.addComponent(entity, Cp.ComponentType.AnimationState, stateComponent);
    return stateComponent
  }

  
}
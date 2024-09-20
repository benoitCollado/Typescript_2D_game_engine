export interface Iconstructor<T>{
    new(...args:any[]):T;
  }

export interface Rect{
  x: number;
  y: number;
  w: number;
  h: number;
}
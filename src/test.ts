import { Vector2D } from "./engine/vector2D";
export default function testVector2():void{
  let vector : Vector2D = new Vector2D(0,0);
  let vector1: Vector2D = new Vector2D(1,1);
  let vector2 : Vector2D = new Vector2D(2,2);
  let vector3: Vector2D = new Vector2D(3,3);
  
  let vectoradd : Vector2D = new Vector2D(0,0)
  for(let i = 0 ; i < 9000; i++){
    vectoradd = vectoradd.add(vector1);
  }
  
  console.log(vectoradd);
  if(vectoradd.x !== 8999 && vectoradd.y !== 8999){
    console.log("erreur dans le test");
  }else{
    console.log("ok test passé");
  }
}
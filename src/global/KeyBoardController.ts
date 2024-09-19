class KeyBoardController {
  public _keys: { [key: string]: boolean } = {};
  constructor(){}

  public init(){
    document.onkeydown = (event) => {
      this._keys[event.key] = true;
      console.log(event.key);
    }
    document.onkeyup = (event) =>{
      this._keys[event.key] = false;
      console.log(event.key);
    }
  }
}
export const KEYBOARD : KeyBoardController = new KeyBoardController();
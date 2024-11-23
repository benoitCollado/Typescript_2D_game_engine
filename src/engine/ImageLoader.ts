class ImageLoader {

  private _images: { [name: string]: HTMLImageElement } = {};
  private _loadedImages: number = 0;
  private _totalImages: number = 0;
 //private _loadedCallback: () => void;
  //private _errorCallback: (error: Error) => void;
  constructor(){//loadedCallback: () => void, errorCallback: (error: Error) => void) {
    //this._loadedCallback = loadedCallback;
    //this._errorCallback = errorCallback;
  }
  public loadImage(name: string, path: string): void {
    const image = new Image();
    image.src = path;
    image.onload = () => {
      console.log("dans le image onload , " , image );
      this._images[name] = image;
      this._loadedImages += 1;
      /*if (this._loadedImages === this._totalImages) {
        //this._loadedCallback();
      }*/
      this.checkAllImageLoaded();
    };
    image.onerror = (error) => {
      console.log(error);
    };
    this._totalImages += 1;
  }
  public getImage(name: string): HTMLImageElement {
    console
    console.log("dans le getImage : ", this._images[name] );
    return this._images[name];
  } 
  public checkAllImageLoaded(){
    if(this._loadedImages === this._totalImages){
      window.dispatchEvent(allImageLoaded);
    }
  }
 
}
const allImageLoaded = new CustomEvent("AllImageLoaded");

 export const IMAGE_LOADER = new ImageLoader()
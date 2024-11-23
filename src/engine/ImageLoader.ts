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
      this._images[name] = image;
      this._loadedImages += 1;
      /*if (this._loadedImages === this._totalImages) {
        //this._loadedCallback();
      }*/
    };
    image.onerror = (error) => {
      console.log(error);
    };
    this._totalImages += 1;
  }
  public getImage(name: string): HTMLImageElement {
    return this._images[name];
  } 
}

 export const IMAGE_LOADER = new ImageLoader()
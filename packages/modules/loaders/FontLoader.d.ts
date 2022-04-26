import {Loader} from "three";

declare class FontLoader extends Loader {
    load(url: string, onLoad: (font: Font) => void, onProgress?: (xhr: XMLHttpRequest) => void, onError?: (error: Error) => void): void
}

declare class Font {
    type: 'Font';
    data: any;

    constructor(data: any)
}

export {FontLoader, Font};

export default {}
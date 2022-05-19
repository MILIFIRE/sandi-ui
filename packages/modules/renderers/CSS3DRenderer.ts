import type { Scene, Object3D, Camera } from "three";

declare class CSS3DObject extends Object3D {
  constructor(element: HTMLDivElement);
}

declare class CSS3DRenderer {
  constructor(parameters?:Object);
  domElement:HTMLElement
  render(scene: Scene, camera: Camera);
  setSize(width: number, height: number);
}

export { CSS3DObject, CSS3DRenderer };

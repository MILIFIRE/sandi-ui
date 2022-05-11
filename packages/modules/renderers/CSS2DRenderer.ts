import type { Scene, Object3D, Camera } from "three";

declare class CSS2DObject extends Object3D {
  constructor(element: HTMLDivElement);
}

declare class CSS2DRenderer {
  constructor(parameters?:Object);
  render(scene: Scene, camera: Camera);
  setSize(width: number, height: number);
}

export { CSS2DObject, CSS2DRenderer };

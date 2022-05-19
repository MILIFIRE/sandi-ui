import {
  SDCylinderGeometry,
  SDConeGeometry,
  SDRaycaster,
  SDCapsuleGeometry,
  SDGroup,
  SDAnimationAction,
  SDAnimationMixer,
  SDGLTFLoader,
  SDFBXLoader,
  SDMeshBasicMaterial,
  SDMeshLambertMaterial,
  SDTextureLoader,
  SDBoxGeometry,
  SDPlaneGeometry,
  SDOrbitControls,
  SDWebglRenderer,
  SDScene,
  SDPerspectiveCamera,
  SDMesh,
  SDDirectionalLight,
  SDTransformControls,
  SDPointerLockControls,
  SDSpotLight,
  SDPointLight,
  SDCSS2DObject,
  SDCSS3DObject
} from "@sandi-ui/components";

import type { Plugin } from "vue";

export default [
  SDCylinderGeometry,
  SDConeGeometry,
  SDRaycaster,
  SDCapsuleGeometry,
  SDGroup,
  SDAnimationAction,
  SDAnimationMixer,
  SDGLTFLoader,
  SDFBXLoader,
  SDMeshBasicMaterial,
  SDMeshLambertMaterial,
  SDTextureLoader,
  SDDirectionalLight,
  SDMesh,
  SDPerspectiveCamera,
  SDScene,
  SDWebglRenderer,
  SDOrbitControls,
  SDBoxGeometry,
  SDPlaneGeometry,
  SDTransformControls,
  SDPointerLockControls,
  SDSpotLight,
  SDPointLight,
  SDCSS2DObject,
  SDCSS3DObject
] as Plugin[];

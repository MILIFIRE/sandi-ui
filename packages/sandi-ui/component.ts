
import { SDCylinderGeometry, SDConeGeometry, SDCapsuleGeometry, SDGroup, SDAnimationAction, SDAnimationMixer, SDGLTFLoader, SDFBXLoader, SDMeshBasicMaterial, SDTextureLoader, SDBoxGeometry, SDPlaneGeometry, SDOrbitControls, SDWebglRenderer, SDScene, SDPerspectiveCamera, SDMesh, SDDirectionalLight, SDTransformControls, SDPointerLockControls } from '@sandi-ui/components'

import type { Plugin } from 'vue'

export default [SDCylinderGeometry, SDConeGeometry,
    SDCapsuleGeometry,
    SDGroup,
    SDAnimationAction,
    SDAnimationMixer,
    SDGLTFLoader,
    SDFBXLoader,
    SDMeshBasicMaterial,
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
    SDPointerLockControls
] as Plugin[]

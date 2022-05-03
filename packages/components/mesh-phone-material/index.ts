import { installComponentWrap } from "@sandi-ui/utils";

import MeshPhongMaterial from "./src/MeshPhoneMaterial.vue";

export const SDMeshPhongMaterial = installComponentWrap(
  "SDMeshPhongMaterial",
  MeshPhongMaterial
);
export default MeshPhongMaterial;
export * from "./src/mesh-phone-material";

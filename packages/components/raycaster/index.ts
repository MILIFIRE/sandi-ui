import { installComponentWrap } from "@sandi-ui/utils";

import Raycaster from "./src/Raycaster.vue";

export const SDRaycaster = installComponentWrap("SDRaycaster", Raycaster);
export default SDRaycaster;
export * from "./src/raycaster";

import { inject, getCurrentInstance, nextTick, watchEffect } from "vue";
import { RENDER_ID } from "@sandi-ui/constants";
import { getCore } from "@sandi-ui/utils";
import { EventType } from "@sandi-ui/enum";
export const useFrame = async (fn: (delta?: number, time?: number) => void) => {
  const instance = getCurrentInstance();
  const core = getCore();
  let renderId = inject<number>(RENDER_ID);
  await nextTick();
  if (!renderId && instance) {
    renderId = core.getRenders().find((id) => id > instance?.uid);
  }
  if (renderId) {
    watchEffect((onCleanup) => {
      core.dispatchEventById(renderId as number, {
        type: EventType.Render,
        render: fn,
      });
      onCleanup(() => {
        core.dispatchEventById(renderId as number, {
          type: EventType.RemoveRender,
          render: fn,
        });
      });
    });
  } else {
    console.error("not found renderId in useFrame");
  }
};

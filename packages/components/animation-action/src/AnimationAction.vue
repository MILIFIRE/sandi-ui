<script  lang="ts">
import { onMounted, defineComponent, watch, computed } from "vue";
import type { PropType } from "vue";
import { LoopMode } from "@sandi-ui/enum";
import useAnimationAction from "./animation-action";
export default defineComponent({
  props: {
    id: { type: [Number, String], default: 0 },
    weight: { type: Number, default: 1 },
    timeScale: { type: Number, default: 1 },
    loopMode: {
      type: Number,
      default: LoopMode.LoopRepeat,
    },
    loop: { type: Number, default: Infinity },
    statue: { type: String, default: "play" },
  },
  setup(props) {
    const { getInstance, setAnimationClip, setProps } = useAnimationAction(
      undefined,
      undefined,
      props
    );
    watch(
      () => props.id,
      (val, oldVal) => {
        const { weight, timeScale, loopMode, loop, statue } = props;
        setAnimationClip(val);
        setProps(weight, timeScale, loopMode, loop, statue);
      }
    );
    watch(props, (val) => {
      const { weight, timeScale, loopMode, loop, statue } = val;
      setProps(weight, timeScale, loopMode, loop, statue);
    });

    onMounted(() => {
      getInstance();
    });
    return { getInstance };
  },
});
</script>

<template>
  <slot></slot>
</template>

<style scoped>
</style>

import type { MaybeRef } from '@vueuse/shared';
import { useTimeoutFn } from '@vueuse/shared';
import { ref, unref } from 'vue';
import type { CopyOptions } from 'copy-rich-text';
import { copy } from 'copy-rich-text';

type copyBaseProps = CopyOptions & {
  text: MaybeRef<string | HTMLElement>; // 拷贝到剪切板里的文本或 HTML 元素
  duration?: number; // 拷贝完成后的延迟时间
  onSuccess?: () => void; // 拷贝成功的回调函数
  onError?: (error: unknown) => void; // 拷贝失败的回调函数
};

export default function useCopy({ text, duration = 1000, onSuccess, onError, ...copyOptions }: copyBaseProps) {
  const copied = ref(false);
  const error = ref();
  const timeout = useTimeoutFn(() => {
    copied.value = false;
    error.value = null;
  }, duration);
  return {
    error,
    copied,
    copy(options?: CopyOptions) {
      if (copied.value) return;
      const textOrElement = unref(text);
      copy(textOrElement, { ...copyOptions, ...options })
        .then(() => {
          copied.value = true;
          onSuccess?.();
          timeout.start();
        })
        .catch((err: Error) => {
          error.value = err;
          onError?.(err);
          timeout.start();
          throw err;
        });
    },
  };
}

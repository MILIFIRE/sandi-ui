// import type { ComponentOptions, DefineComponent } from 'vue';

declare module '*.module.scss' {
  const obj: Record<string, string>;
  export default obj;
}

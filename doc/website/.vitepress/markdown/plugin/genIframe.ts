import { resolve } from 'path';

export type IframeMeta = {
  title?: string;
  entry: string;
};
const autoEntry = (entry: string) => {
  if (process.env.NODE_ENV === 'development') {
    return `/@fs/${entry}`;
  }
  return entry;
};
export const genHtml = (meta: IframeMeta) => {
  const customCss = resolve(process.cwd(), 'website/.vitepress/theme/custom.scss');
  const devTip = (process.env.NODE_ENV === 'development'
    ? `console.log('iframe 模式自动挂载了一个vue组件：%o', module.default.__file || module.default);console.log('如果你不希望自动挂载，移除 export default');`
    : '');
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${meta.title}</title>
    <!-- <link rel="stylesheet" href="${autoEntry(customCss)}"> -->
    <style>body { margin: 0;}</style>
  </head>
  <body>
    <script type="module">
      (async () => {
        const module = await import("${autoEntry(meta.entry)}");
        if (module.default) {
          const { createApp } = await import('vue');
          const app = createApp(module.default);
          const div = document.createElement('div');
          ${devTip}
          div.setAttribute('data-comment', 'auto mount');
          document.body.appendChild(div);
          app.mount(div);
        }
      })()
    </script>
  </body>
  </html>`;
};

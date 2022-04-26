import type { Plugin, ViteDevServer } from 'vite';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { genHtml } from './genIframe';

export default function demoIframe(): Plugin {
  return {
    name: 'demo-iframe-dev',
    // 在插件里加入口也是行不通的，vitepress 没有留余地，而且我们的终极目标不仅仅是 html，所以就放弃了。
    // config(rawConfig) {
    //   console.log('demo-iframe config', rawConfig.build.rollupOptions);
    //   rawConfig.build.rollupOptions.input['-demos_abc'] = '/Users/xxx/xx/abc.html';
    // },
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // console.log('req', req.url);
          // if not demo html, next it.
          if (req.url?.match(/^\/-demos\/(\w+)\.html/)) {
            const demoName = RegExp.$1;
            // console.log('接到 demo iframe 请求', demoName);
            // 我不知道 markdown-it-plugin 怎么跟 vite-plugin 低成本取得联系，所以直接通过文件传参了。这个文件是 markdown-it-demo 生成的。
            // 由于 vite 的特性，文件内容是 lazy 的，所以这里需要每次读取文件以确保可以正确访问到。
            const demos = JSON.parse(readFileSync(resolve(process.cwd(), 'node_modules/demos.json'), 'utf-8'));
            const meta = demos[demoName];
            if (!meta?.entry) {
              res.statusCode = 404;
              res.end('not found');
              return;
            }
            meta.title = meta.title || demoName;
            // todo support html file
            let content = genHtml(meta);
            content = await server.transformIndexHtml?.(req.url, content, req.originalUrl);
            res.end(content);
          } else {
            await next();
          }
        });
      };
    },
  };
}

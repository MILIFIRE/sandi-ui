import vue from '@vitejs/plugin-vue';
import { mergeConfig, UserConfig } from 'vite';
// 复用配置
import config from '../../../vite.config';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { IframeMeta } from './genIframe';
import { genHtml } from './genIframe';
import { config as vitepressConfig } from '../../config';

// 我不知道 markdown-it-plugin 怎么跟 vite-plugin 低成本取得联系，所以直接通过文件传参了。这个文件是 markdown-it-demo 生成的。
const demos: Record<string, IframeMeta> = JSON.parse(
  readFileSync(resolve(process.cwd(), 'node_modules/demos.json'), 'utf-8'),
);

// 虚拟的目录名，和 devServer 保持一致
const dir = resolve(process.cwd(), '-demos');

const iframeConfig: UserConfig = {
  plugins: [
    // 复用配置了，但是原本的配置里没写，所以这里添加了
    vue(),
    // todo 合并
    {
      name: 'demo-iframe-build',
      resolveId(id) {
        if (id.match(/\/-demos\/(\w+)\.html/)) {
          return id;
        }
        return undefined;
      },
      load(id) {
        if (id.match(/\/-demos\/(\w+)\.html/)) {
          const demoName = RegExp.$1;
          const meta = demos[demoName];
          if (meta) {
            meta.title = meta.title || demoName;
            return genHtml(meta);
          }
        }
        return undefined;
      },
    },
  ],
  base: vitepressConfig.base,
  build: {
    // 为了方便，目录选择了 vitepress 的目录
    outDir: 'website/.vitepress/dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {},
    },
  },
};

const input = iframeConfig.build.rollupOptions.input;

// 添加所有入口
Object.entries(demos).forEach(([demoName, meta]) => {
  const htmlEntry = `${dir}/${demoName}.html`;
  if (Array.isArray(input)) {
    input.push(htmlEntry);
  } else {
    input[demoName] = htmlEntry;
  }
});

export default mergeConfig(config, iframeConfig);

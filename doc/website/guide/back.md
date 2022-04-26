
## 编写文档

除了 [vitepress](https://vitepress.vuejs.org/guide/markdown.html) 提供的 markdown 能力，本项目补充了 **Demo 演示能力**。

### demo 可用的 Props

| 名称 | 类型 | 是否必传 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| src | string | yes | - | demo 文件 |
| title | string | no | `"基本使用"` | 标题 |
| desc | string | no | - | 描述，支持 markdown |
| compact | boolean | no | - | 移除内边距 |
| iframe | boolean | no | `src.endsWith('.html')` | 以 iframe 模式运行 |
| iframeHeight | string | no | (自动计算) | iframe['height'] |
| file | string | no | - | 类似于 src，额外显示的代码，可以重复传值，例如：<br> `file="./a.ts" file="./b.ts"` |

### 方式一

<demo src="./demo.vue" />

```markdown
<demo src="./demo.vue" />
```

<demo
  src="./demo.vue"
  file="../index.md"
  title="我是一个可选的标题"
  compact
  desc="我是一段可选的描述，我可以用 `Markdown` 编写。"
/>

```markdown
<demo
  src="./demo.vue"
  file="../index.md"
  title="我是一个可选的标题"
  compact
  desc="我是一段可选的描述，我可以用 `Markdown` 编写。"
/>
```

<demo
  src="./demo.vue"
  title="iframe 模式"
  iframe
  iframeHeight="50"
/>

```markdown
<demo src="./demo.vue" title="iframe 模式" iframe iframeHeight="50" />
```

### 方式二

::: demo src="./demo.vue" title="Demo 标题"

我是一段描述，我可以用 `Markdown` 编写。

我是真正的 `Markdown` ，有 `IDE` 提示。

:::

```markdown
::: demo src="./demo.vue" title="Demo 标题"

我是一段描述，我可以用 `Markdown` 编写。

我是真正的 `Markdown` ，有 `IDE` 提示。

:::
```

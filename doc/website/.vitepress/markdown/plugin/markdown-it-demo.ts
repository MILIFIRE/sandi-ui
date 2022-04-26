import mdContainer from 'markdown-it-container';
import MarkdownIt from 'markdown-it';
import path from 'path';
import fs from 'fs';
// import md5 from 'md5';
import { highlight } from './highlight';
import { config as vitepressConfig } from '../../config';

let count = 1001;
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/;
// const attrRE = /\b(?<key>\w+)=("|')(?<value>[^\2]*)\2/g;
const attrRE = /\b(?<key>\w+)(="(?<value>[^"]*)")?/g;
const demoContainer = 'DemoContainer';

/** 解析 a="1" b="2" 这种格式的字符串，返回一个对象 */
function parseAttrs(attrs: string) {
  const meta = {};
  let rez = null;
  while ((rez = attrRE.exec(attrs))) {
    const { key, value } = rez.groups;
    const newValue = value === void 0 ? true : value;
    if (Array.isArray(meta[key])) {
      meta[key].push(newValue);
    } else if (!meta[key]) {
      meta[key] = newValue;
    } else {
      meta[key] = [meta[key], newValue];
    }
  }
  return meta;
}

/** 在script里添加组件引入语句 */
function addImportDeclaration(hoistedTags, localName: string, source: string) {
  const existingScriptIndex = hoistedTags.findIndex((tag) => {
    return scriptSetupRE.test(tag);
  });
  if (existingScriptIndex === -1) {
    hoistedTags.push(`<script setup>\nimport ${localName} from '${source}';\n</script>`);
  } else {
    hoistedTags[existingScriptIndex] = hoistedTags[existingScriptIndex].replace(
      /<\/script>/,
      `\nimport ${localName} from '${source}';\n</script>`,
    );
  }
}

/** 在script里添加变量声明语句 */
function addVariableDeclaration(hoistedTags, localName: string, express: string) {
  const existingScriptIndex = hoistedTags.findIndex((tag) => {
    return scriptSetupRE.test(tag);
  });
  if (existingScriptIndex === -1) {
    hoistedTags.push(`<script setup>\nconst ${localName} = ${express};\n</script>`);
  } else {
    hoistedTags[existingScriptIndex] = hoistedTags[existingScriptIndex].replace(
      /<\/script>/,
      `\nconst ${localName} = ${express};\n</script>`,
    );
  }
}

type FileDTO = {
  filePath: string;
  codeStr: string;
  htmlStr?: string;
  language: string;
};

/** 读取文件内容，返回统一格式。如果文件不存在，智能推测文件名，如果没有推测出来，返回null */
function resolveFile(absolutePath): FileDTO | null {
  // console.log(absolutePath);
  if (!absolutePath) return null;
  let filePath = absolutePath;

  if (!fs.existsSync(filePath)) {
    // 推测 absolutePath
    const extensions = ['.ts', '.tsx', '.vue', '.html'];
    for (const ext of extensions) {
      filePath = absolutePath + ext;
      if (fs.existsSync(filePath)) {
        break;
      }
    }
  }
  if (!fs.existsSync(filePath)) return null;
  const rawContent = fs.readFileSync(filePath, 'utf-8');

  const language = filePath.match(/\.(\w+)$/)?.[1];
  return {
    filePath,
    codeStr: encodeURIComponent(rawContent),
    language,
    htmlStr: encodeURIComponent(highlight(rawContent, language)),
  };
}

const demos = {};
/** 将demo信息拼接成 html(vue template) 字符串 */
function genDemo(meta, md: MarkdownIt) {
  // @ts-ignore
  const { __path, __data: data } = md;
  const hoistedTags = data.hoistedTags || (data.hoistedTags = []);
  // console.log('meta: ', meta);
  let htmlOpenString = `<${demoContainer}`;
  // <DemoContainer
  let attrsStr = '';
  if (meta.title) {
    attrsStr += ` title="${meta.title}"`;
    // <DemoContainer title="基本使用"
  }
  if (meta.desc) {
    const rez = md.renderInline(meta.desc);
    attrsStr += ` desc="${encodeURIComponent(rez)}"`;
  }
  if (meta.compact) {
    attrsStr += ` compact`;
  }
  if (!meta.src) {
    let errorStr = `NotFound: src should be a string, but got ${meta.src}`;
    console.error(__path, meta.src);
    throw new Error(errorStr);
    // attrsStr += ` codeStr="${encodeURIComponent(errorStr)}"`;
    // htmlOpenString += ` ${attrsStr}><pre>${errorStr}</pre>`;
    // return { htmlOpenString };
  }
  const currentDir = path.dirname(__path);
  let absolutePath = path.resolve(currentDir, meta.src);
  const srcFile = resolveFile(absolutePath);
  if (meta.language) {
    srcFile.language = meta.language;
  }

  if (!srcFile) {
    let errorStr = `NotFound: file not found\n\t${meta.src}`;
    throw new Error(errorStr);
    // attrsStr += ` codeStr="${encodeURIComponent(errorStr)}"`;
    // htmlOpenString += ` ${attrsStr}><pre>${errorStr}</pre>`;
  } else {
    const metaFiles = Array.isArray(meta.file) ? meta.file : [meta.file].filter(Boolean);

    const files = [srcFile, ...metaFiles.map((p) => resolveFile(path.resolve(currentDir, p)))]
      .filter((f, i, a) => {
        // console.log('filter', f);
        if (!f) return false;
        return a.findIndex((f2) => f2.filePath === f.filePath) === i;
      })
      .map((f) => ({ ...f, name: path.relative(currentDir, f.filePath) }));
    // todo const localName = 'Demo' + md5(srcFile.filePath);
    const localName = `Demo${++count}`;
    const varName = `files${count}`;
    addVariableDeclaration(hoistedTags, varName, JSON.stringify(files));
    const filesAttr = ` :files="${varName}"`;
    attrsStr += filesAttr;

    let useIframeMode = meta.iframe || absolutePath.endsWith('.html');
    if (useIframeMode) {
      // const isSymbolicLink = fs.lstatSync(absolutePath).isSymbolicLink()
      attrsStr += ` iframe`;
      demos[localName] = { title: meta.title, entry: absolutePath };
      fs.writeFileSync(path.resolve(process.cwd(), 'node_modules/demos.json'), JSON.stringify(demos, null, 2));
      htmlOpenString += ` ${attrsStr}><iframe src="${vitepressConfig.base || '/'}-demos/${localName}.html"`;
      // <DemoContainer title="基本使用" ><iframe src="/-demos/${localName}.html"`
      if (meta.iframeHeight) {
        htmlOpenString += ` height="${meta.iframeHeight}"`;
      }
      htmlOpenString += '/>';
    } else {
      addImportDeclaration(hoistedTags, localName, meta.src);
      // <DemoContainer title="基本使用" ><Demo1002 />
      htmlOpenString += ` ${attrsStr}><${localName} />`;
    }
  }

  return {
    htmlOpenString,
  };
}

// MarkdownIt.PluginSimple
export default (md: MarkdownIt) => {
  md.renderer.rules.html_inline = md.renderer.rules.html_block = (tokens, idx) => {
    const content = tokens[idx].content;

    if (/^<demo(?=(\s|>|$))/i.test(content.trim())) {
      const meta = parseAttrs(content.trim());
      const demoData = genDemo(meta, md);
      return `${demoData.htmlOpenString}</${demoContainer}>`;
    } else {
      return content;
    }
  };

  // 这里为了复用代码，API 也设计成了一样的
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        // ::: demo 同一行后面的内容
        const attrs = tokens[idx].info.trim().match(/^demo\s*(.*)$/)?.[1];
        const meta = parseAttrs(attrs);
        const demoData = genDemo(meta, md);
        return demoData.htmlOpenString + '<template #desc>';
      } else {
        return `</template></${demoContainer}>`;
      }
    },
  });
};

import MarkdownIt from 'markdown-it';
import { UserConfig } from 'vitepress';
import markdownItCheckbox from 'markdown-it-checkbox';
import markdownItDemo from './markdown/plugin/markdown-it-demo';
const getComponents = () => [
  {
    text: '核心',
    link: '/components/Raycaster/index',
    children: [
      {
        text: 'Raycaster',
        link: '/components/Raycaster/Raycaster',
      },
      {
        text: 'Object3d',
        link: '/components/Objects/object3d',
      },
    ],
  },
  {
    text: '渲染器',
    link: '/components/Renderers/index',
    children: [
      {
        text: 'WebGLRenderer',
        link: '/components/Renderers/WebGLRenderer',
      },
    ],
  },
  {
    text: 'CSS2D - 信息点',
    link: '/components/CSS2D/SDCSS2DObject',
    children: [
      {
        text: 'SDCSS2DObject',
        link: '/components/CSS2D/SDCSS2DObject',
      },
    ],
  },
  {
    text: '场景',
    link: '/components/Scenes/index',
    children: [
      {
        text: 'Scene',
        link: '/components/Scenes/index',
      },
    ],
  },
  {
    text: '摄像机',
    link: '/components/Cameras/index',
    children: [
      {
        text: 'PerspectiveCamera',
        link: '/components/Cameras/PerspectiveCamera',
      },
    ],
  },
  {
    text: '物体',
    link: '/components/Objects/index',
    children: [
      {
        text: 'Mesh',
        link: '/components/Objects/Mesh',
      },
      {
        text: 'Group',
        link: '/components/Objects/Group',
      },
    ],
  },
  {
    text: '几何体',
    link: '/components/Geometries/index',
    children: [
      {
        text: 'BoxGeometry',
        link: '/components/Geometries/BoxGeometry',
      },
      {
        text: 'CapsuleGeometry',
        link: '/components/Geometries/CapsuleGeometry',
      },
      {
        text: 'ConeGeometry',
        link: '/components/Geometries/ConeGeometry',
      },
      {
        text: 'CylinderGeometry',
        link: '/components/Geometries/CylinderGeometry',
      },
    ],
  },
  {
    text: '材质',
    link: '/components/Materials/index',
    children: [
      {
        text: 'Material',
        link: '/components/Materials/Material',
      },
      {
        text: 'MeshBasicMaterial',
        link: '/components/Materials/MeshBasicMaterial',
      },
    ],
  },
  {
    text: '加载器',
    link: '/components/Loaders/index',
    children: [
      {
        text: 'TextureLoader',
        link: '/components/Loaders/TextureLoader',
      },
      {
        text: 'GLTFLoader',
        link: '/components/Loaders/GLTFLoader',
      },
      {
        text: 'FBXLoader',
        link: '/components/Loaders/FBXLoader',
      },
    ],
  },
  {
    text: '控制器',
    link: '/components/Controls/index',
    children: [
      {
        text: 'OrbitControls',
        link: '/components/Controls/OrbitControls',
      },
      {
        text: 'TransformControls',
        link: '/components/Controls/TransformControls',
      },
    ],
  },
  {
    text: '动画',
    link: '/components/Animation/index',
    children: [
      {
        text: 'AnimationAction',
        link: '/components/Animation/AnimationAction',
      },
      {
        text: 'AnimationMixer',
        link: '/components/Animation/AnimationMixer',
      },
    ],
  },
];
const getGuide = () => [
  {
    text: '快速开始',
    link: '/guide/install',
    children: [
      {
        text: '安装',
        link: '/guide/install',
      },
    ],
  },
  {
    text: '简单教程',
    link: '/guide/basicConcept',
    children: [
      {
        text: '基础概念',
        link: '/guide/basicConcept',
      },
      {
        text: '创建一个箱子',
        link: '/guide/creatBox',
      },
      {
        text: '360度观察箱子',
        link: '/guide/observationBox',
      },
      {
        text: '移动箱子',
        link: '/guide/moveBox',
      },
      {
        text: '创建多个箱子',
        link: '/guide/creatManyBox',
      },
      {
        text: '动态更换箱子贴图',
        link: '/guide/dynamicMap',
      },
      {
        text: '添加一个角色',
        link: '/guide/renderingAnimation',
      },
      {
        text: '三弟表情变变变',
        link: '/guide/replaceFaceMap',
      },
    ],
  },
];
const getExample = () => [
  {
    text: '物体交互',
    link: '/example/Metaverse/index',
  },
  {
    text: 'vue信息点展示',
    link: '/example/CSS2D/index',
  },
];
export const config: UserConfig = {
  // base: '/sudi-ui_doc/',
  lang: 'zh-CN',
  title: process.env.npm_package_name,
  description: process.env.npm_package_description,
  base: '/sandi-ui/',
  // https://vitepress.vuejs.org/guide/markdown.html#advanced-configuration
  markdown: {
    lineNumbers: true,
    config: (md: MarkdownIt) => {
      md.use(markdownItCheckbox);
      md.use(markdownItDemo);
    },
  },

  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/install', activeMatch: '^/guide/' },
      { text: '组件', link: '/components/Renderers/index', activeMatch: '^/components/' },
      { text: '例子', link: '/example/Metaverse/index', activeMatch: '^/example/' },
      //   {
      //     text: '发布日志',
      //     link: '/changelog',
      //   },
      {
        text: 'Github',
        link: 'https://github.com/MILIFIRE/sandi-ui',
      },
    ],
    sidebar: {
      '/guide/': getGuide(),
      '/components/': getComponents(),
      '/example/': getExample(),
    },
  },
};

<script lang="ts">
  import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
  import useCopy from './useCopy';

  type FileDTO = {
    filePath: string;
    name: string;
    codeStr: string;
    htmlStr?: string;
    language: string;
  };

  export default defineComponent({
    props: {
      title: {
        type: String,
        default: '基本使用',
      },
      iframe: {
        type: Boolean,
      },
      compact: {
        type: Boolean,
      },
      desc: {
        type: String,
      },
      files: {
        type: Array as PropType<FileDTO[]>,
        default: () => [],
      },
    },
    setup(props) {
      const slotWrapper = ref<HTMLElement>();
      const currentTab = ref<string>(props.files[0]?.name);
      const currentFile = computed(() => props.files.find((file) => file.name === currentTab.value));
      // console.log(props.files);
      const { copied, copy, error } = useCopy({
        text: computed(() => decodeURIComponent(currentFile.value?.codeStr || '')),
        html: true,
      });
      const tooltip = computed(() => {
        if (error.value) {
          return `复制失败: ${error.value?.message}`;
        }
        if (copied.value) {
          return '复制成功';
        }
        return '点击复制';
      });
      onMounted(() => {
        if (props.iframe) {
          setTimeout(() => {
            const iframe = slotWrapper.value?.querySelector('iframe');
            if (iframe) {
              const definedHeight = iframe.getAttribute('height');
              if (definedHeight) return;
              iframe.onload = () => {
                setTimeout(() => {
                  const html = iframe.contentWindow?.document.documentElement;
                  // console.log(iframe, html);
                  if (html) {
                    // console.log(html.scrollHeight, html.clientHeight, html.offsetHeight);
                    iframe.style.height = `${html.scrollHeight}px`;
                  }
                }, 1000);
              };
            }
          }, 0);
        }
      });

      return {
        tooltip,
        slotWrapper,
        currentTab,
        currentFile,
        // onTabChange(tab: obj) {
        //   console.log(tab);
        // },
        copy,
        copied,
        sourceVisible: ref(false),
        openNewTab() {
          const iframe = slotWrapper.value?.querySelector('iframe');
          const href = iframe?.src;
          href && window.open(href);
        },
        reload() {
          const iframe = slotWrapper.value?.querySelector('iframe');
          iframe?.contentDocument?.location.reload();
        },
      };
    },
  });
</script>

<template>
  <ClientOnly>
    <div class="browser-nav" v-if="iframe"></div>
    <section v-bind="$attrs" class="demo-container">
      <div class="demo-slot" ref="slotWrapper" :class="{ compact, iframe }">
        <slot></slot>
      </div>

      <div class="demo-title-desc">
        <span class="demo-title">{{ title }}</span>
        <div class="demo-desc" v-if="desc || $slots.desc">
          <slot name="desc">
            <p v-html="decodeURIComponent(desc)"></p>
          </slot>
        </div>
      </div>

      <div class="demo-actions">
        <div class="demo-buttons">
          <template v-if="iframe">
            <div class="tooltip">
              <img class="icon" src="./icons/new_tab.svg" @click="openNewTab" />
              <span class="tooltiptext tooltip-top">在新标签页中打开</span>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div class="tooltip">
              <img class="icon" src="./icons/reload.svg" @click="reload" />
              <span class="tooltiptext tooltip-top">刷新</span>
            </div>
          </template>
        </div>

        <!-- @tab-click="onTabChange" -->
        <div class="theTab" v-if="sourceVisible && files.length > 1">
          <span
            v-for="file in files"
            :key="file.name"
            :title="file.name"
            @click="currentTab = file.name"
            :class="{ active: currentTab === file.name }"
          >
            {{ file.name }}
          </span>
        </div>

        <div v-if="files.length > 0" class="demo-buttons" style="margin-left: auto">
          <div class="tooltip">
            <img class="icon" v-if="copied" src="./icons/success.svg" />
            <img class="icon" v-else src="./icons/copy.svg" @click="copy" />
            <span class="tooltiptext tooltip-top">{{ tooltip }}</span>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div class="tooltip">
            <img class="icon" @click="sourceVisible = !sourceVisible" src="./icons/source_code.svg" alt="code" />
            <span class="tooltiptext tooltip-top">{{ sourceVisible ? '收起源码' : '查看源代码' }}</span>
          </div>
        </div>
      </div>
      <!-- <ElCollapseTransition> -->
      <template v-if="sourceVisible">
        <div
          v-if="currentFile?.htmlStr"
          v-html="decodeURIComponent(currentFile.htmlStr)"
          key="highlight"
          :class="`language-${currentFile.language} source-code-wrapper`"
        />
        <div
          v-else-if="currentFile?.codeStr"
          key="raw"
          :class="`language-${currentFile.language} source-code-wrapper`"
          style="color: white"
        >
          <pre>{{ currentFile.codeStr }}</pre>
        </div>
        <div class="botton-collapse-button" key="button" @click="sourceVisible = false">
          <img src="./icons/caret-top.svg" class="icon" />
          收起
        </div>
      </template>
      <!-- </ElCollapseTransition> -->
    </section>
  </ClientOnly>
</template>

<style lang="scss" scoped>
  .demo-container {
    background-color: #fff;
    border: 1px solid var(--c-divider);
    border-radius: 1px;
    & + &,
    & + .browser-nav {
      margin-top: 24px;
    }
    .demo-slot {
      padding: 24px;
      &.compact {
        padding: 0;
        padding-bottom: 14px;
      }
      :deep(iframe) {
        border: 0;
        width: 100%;
      }
    }
  }
  .browser-nav {
    padding: 2px 8px 2px;
    background-color: #ebedf1;
    & + .demo-container {
      border-top: 0;
    }
    &::before {
      // browser-nav
      content: ' ';
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #fd6458;
      box-shadow: 20px 0 0 #ffbf2b, 40px 0 0 #24cc3d;
    }
  }

  .demo-actions {
    display: flex;
    height: 40px;
    padding: 0 8px;
    align-items: center;
  }

  .demo-buttons {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .icon {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
  }

  .theTab {
    span {
      padding: 9px;
      cursor: pointer;
      &.active {
        border-bottom: 3px solid var(--c-brand);
      }
    }
  }
  .source-code-wrapper {
    border-top: 1px dashed var(--c-divider);
    box-sizing: border-box;
    margin: 0 !important;
    border-radius: 0;
    max-width: 100%;
  }

  .demo-title-desc {
    border-top: 1px dashed var(--c-divider);
    position: relative;

    .demo-title {
      position: absolute;
      top: 0;
      left: 1em;
      transform: translateY(-50%);
      background: #fff;
      padding: 0 0.2em;
      font-weight: 500;
      line-height: 1;
      color: #454d64;
    }
    .demo-desc {
      display: inline-block;
      width: 100%;
      padding: 0 1em;
      color: #454d64;
      // font-size: 14px;
      border-bottom: 1px dashed var(--c-divider);
    }
  }
  .botton-collapse-button {
    z-index: 10;
    position: sticky;
    bottom: 0;
    text-align: center;
    background: #ffffff9f;
    font-weight: 500;
    line-height: 2;
    transition: ease 0.3s;
    cursor: pointer;
    user-select: none;
    &:hover {
      color: var(--el-color-primary);
    }
  }

  // https://www.w3schools.com/css/css_tooltip.asp
  /* Tooltip container */
  .tooltip {
    position: relative;
    display: inline-block;
    height: 100%;
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    background-color: #000000b0;
    color: #fff;
    /* text-align: center; */
    padding: 4px 7px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    white-space: nowrap;
    max-width: 200px;
    /* white-space: nowrap; */
    left: 50%;
    font-size: 14px;
    transform: translate(-50%, -5px);
  }
  .tooltip-top::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #000000b0 transparent transparent transparent;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
</style>

import DefaultTheme from 'vitepress/theme';
import DemoContainer from './DemoContainer.vue';
import './custom.scss';
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
export default {
    ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        app.component('DemoContainer', DemoContainer);
        app.use(elementPlus)
        app.config.globalProperties.$withBase = relativePath => `/sandi-ui/${relativePath}`
        app.mixin({
            mounted() {
                if (window) {
                    if (!window.sandiUi) {
                        import("../../../../dist/sandi-ui/es/index.mjs").then(function (m) {
                            app.use(m.default)
                        })
                        window.sandiUi = true
                    }
                }

            },
        })
    },
};

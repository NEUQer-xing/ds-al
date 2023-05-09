import { createApp } from 'vue'

import VueMarkdownEditor from '@kangc/v-md-editor';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';


import { createPinia } from 'pinia'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import "@icon-park/vue-next/styles/index.css";
import "./assets/css/tailwind.css";
import App from './App.vue'
import router from './router'

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
VueMarkdownEditor.use(createKatexPlugin());

const app = createApp(App)

app.use(VMdPreviewHtml)
app.use(VueMarkdownEditor)
app.use(createPinia())
app.use(router)
app.use(ViewUIPlus)
app.mount('#app')
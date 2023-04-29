import { createApp } from 'vue'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import { createPinia } from 'pinia'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import App from './App.vue'
import router from './router'

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App)

app.use(VueMarkdownEditor)
app.use(createPinia())
app.use(router)
app.use(ViewUIPlus)
app.mount('#app')
import { createApp } from "vue";
import MainApp from "./app.vue";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  BiClipboard,
  BiClipboardCheck,
  BiBoxArrowUpRight,
} from "oh-vue-icons/icons";

addIcons(BiClipboard, BiClipboardCheck, BiBoxArrowUpRight);

const app = createApp(MainApp);
app.component("v-icon", OhVueIcon);
app.mount("#app");

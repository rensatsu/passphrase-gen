import { createApp } from "vue";
import MainApp from "./app.vue";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faClipboard,
  faCheck,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

// Make sure this is before any other `fontawesome` API calls
config.autoAddCss = false;

if (import.meta.env.PROD) {
  config.showMissingIcons = false;
}

library.add(faClipboard, faCheck, faUpRightFromSquare);

// Create Vue App
const app = createApp(MainApp);
app.component("fa-icon", FontAwesomeIcon);
app.mount("#app");

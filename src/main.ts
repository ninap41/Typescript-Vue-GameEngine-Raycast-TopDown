import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import "../src/assets/base.scss"
// https://www.npmjs.com/package/vue-konva
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount("#app")
import "bootstrap/dist/js/bootstrap.js"

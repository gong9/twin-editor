import { defineConfig } from "@umijs/max";
import router from "./src/router";

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: "editor",
  },
  routes:router,
  npmClient: "pnpm",
  tailwindcss: {},
  alias:{
    "@":require("path").resolve(__dirname,"src")
  }
});

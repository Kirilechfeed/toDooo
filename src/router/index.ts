import { createRouter, createWebHistory } from "vue-router";

import MyProject from "../components/views/MyProject.vue";
import SettingProject from "../components/views/SettingProject.vue";
import DoneTask from "../components/views/DoneTask.vue";
const routes = [
  {
    path: "/myProject",
    name: "myProject",
    component: MyProject,
    props: true,
  },
  { path: "/myProject/:id", name: "About", component: SettingProject },
  { path: "/doneTask", component: DoneTask },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

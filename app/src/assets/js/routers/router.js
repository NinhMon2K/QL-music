import { createRouter, createWebHistory } from "vue-router";
import routerAsset from "./routerAccount";
import routerMusic from "./routerMusic";
import routerCategory from "./routerCategory";
import routerAlbum from "./routerAlbum";
import routerBanner from "./routerBanner";
import routerPlaylist from "./routerPlaylist";
import routerReport from "./routerReport";
import routerSinger from "./routerSinger";
const routes = [
  {
    path: "",
    component: () => import("@/components/layouts/TheMain.vue"),
    children: [
      ...routerAsset,
      ...routerMusic,
      ...routerCategory,
      ...routerSinger,
      ...routerAlbum,
      ...routerBanner,
      ...routerPlaylist,
      ...routerReport,
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

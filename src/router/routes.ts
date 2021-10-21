import { RouteConfig } from "vue-router";

const page = (path: string) => () => import(`@/pages/${path}`).then((m) => m.default || m);

export default [
  {
    path: "/",
    name: "users",
    component: page("index.vue"),
    children: [
      {
        path: "user/:username",
        name: "user",
        component: page("user.vue"),
      },
    ],
  },
] as RouteConfig[];

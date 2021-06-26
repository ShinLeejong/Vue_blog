import Dashboard from "../../views/Dashboard.vue";

export default [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/Home",
    name: "Home",
    component: (): Promise<typeof import("*.vue")> =>
      import("../../views/Home.vue"),
  },
  {
    path: "/board",
    name: "Board",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../../views/Boards.vue"),
  },
  {
    path: "/team",
    name: "Team",
    component: () => import("../../views/Team.vue"),
  },
];

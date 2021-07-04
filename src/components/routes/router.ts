import Dashboard from "../../views/Dashboard/Dashboard.vue";

export default [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/notice",
    name: "Notice",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../../views/Notice/Notice.vue"),
  },
  {
    path: "/board",
    name: "Board",
    component: (): Promise<typeof import("*.vue")> =>
      import("../../views/Board/Board.vue"),
  },
  {
    path: "/team",
    name: "Team",
    component: () => import("../../views/Team/Team.vue"),
  },
];

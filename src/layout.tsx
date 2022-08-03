import {
  homeModule,
  businessDetailsModule,
  businessSearchModule,
} from "./common/loadableModule";

export const publicRoutes = [
  {
    component: homeModule,
    exact: true,
    path: "/",
  },
  {
    component: homeModule,
    path: "/home",
  },
  {
    component: businessDetailsModule,
    path: "/business/:name/:id",
  },
  {
    component: businessSearchModule,
    path: "/search-results",
  },
];

export const protectedRoutes = [
  {
    component: homeModule,
    exact: true,
    path: "/",
  },
];

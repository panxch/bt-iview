const routers = [
    {path: '/',component: (resolve) => require(['../views/index.vue'], resolve)},
    {path: '/login',component: (resolve) => require(['../views/login.vue'], resolve)},
    {path: '/class',component: (resolve) => require(['../views/basics/class.vue'], resolve)}
];
export default routers;
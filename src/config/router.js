const routers = [
    {path: '/',component: (resolve) => require(['../views/index.vue'], resolve)},
    {path: '/login',component: (resolve) => require(['../views/login.vue'], resolve)},
    {path: '/class',component: (resolve) => require(['../views/basics/class.vue'], resolve)},
    {path: '/course',component: (resolve) => require(['../views/basics/course.vue'], resolve)},
    {path: '/teacher',component: (resolve) => require(['../views/teacher/index.vue'], resolve)},
    {path: '/teacher/import',component: (resolve) => require(['../views/teacher/import.vue'], resolve)},
    {path: '/score',component: (resolve) => require(['../views/score/index.vue'], resolve)},
    {path: '/score/import',component: (resolve) => require(['../views/score/import.vue'], resolve)},
];
export default routers;
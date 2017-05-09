const routers = [
    {path: '/',component: (resolve) => require(['../views/index.vue'], resolve)},
    {path: '/login',component: (resolve) => require(['../views/login.vue'], resolve)},
    {path: '/school',component: (resolve) => require(['../views/school/index.vue'], resolve)},
    {path: '/school/add',component: (resolve) => require(['../views/school/model.vue'], resolve)},
    {path: '/school/update',component: (resolve) => require(['../views/school/model.vue'], resolve)},
    {path: '/grade',component: (resolve) => require(['../views/grade/index.vue'], resolve)},
    {path: '/grade/add',component: (resolve) => require(['../views/grade/model.vue'], resolve)},
    {path: '/grade/update',component: (resolve) => require(['../views/grade/model.vue'], resolve)},
    {path: '/class',component: (resolve) => require(['../views/class/index.vue'], resolve)},
    {path: '/class/update',component: (resolve) => require(['../views/class/model.vue'], resolve)},
    {path: '/class/import',component: (resolve) => require(['../views/class/import.vue'], resolve)},
    {path: '/course',component: (resolve) => require(['../views/course/import.vue'], resolve)},
    {path: '/teacher',component: (resolve) => require(['../views/teacher/index.vue'], resolve)},
    {path: '/teacher/update',component: (resolve) => require(['../views/teacher/model.vue'], resolve)},
    {path: '/teacher/import',component: (resolve) => require(['../views/teacher/import.vue'], resolve)},
    {path: '/student',component: (resolve) => require(['../views/student/index.vue'], resolve)},
    {path: '/student/update',component: (resolve) => require(['../views/student/model.vue'], resolve)},
    {path: '/student/import',component: (resolve) => require(['../views/student/import.vue'], resolve)},
    {path: '/score',component: (resolve) => require(['../views/score/index.vue'], resolve)},
    {path: '/score/import',component: (resolve) => require(['../views/score/import.vue'], resolve)},
];

export default routers;
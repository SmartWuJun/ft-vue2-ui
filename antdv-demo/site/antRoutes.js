import Layout from '../components/layout.vue';

import demoRoutes from './demoRoutes';



export default [
  {
    path: '/ant',
    component: Layout,
    props: (route) => {
      const name = route.path.split('/ant/')[1].split('/')[0];
      return { layoutName: 'ant', name, showDemo: true };
    },
    children: demoRoutes,
  },

];



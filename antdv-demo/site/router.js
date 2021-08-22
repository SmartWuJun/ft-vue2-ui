import Layout from '../components/layout.vue';
import Iframe from '../components/iframe.vue';
import demoRoutes from './ftDemoRoutes';
import antRoutes from './antRoutes';

import VueRouter from 'vue-router';

const routes = [
  ...antRoutes,
  {
    path: '/components',
    component: Layout,
    props: (route) => {
      const name = route.path.split('/components/')[1].split('/')[0];
      return { layoutName: 'components', name, showDemo: true };
    },
    children: demoRoutes,
  },
  {
    path: '/iframe',
    component: Iframe,
    children: demoRoutes.map((item) => ({
      ...item,
      props: (route) => {
        const hash = route.hash.replace('#', '');
        return { iframeName: hash };
      },
    })),
  },
  {
    path: '/',
    component: Layout,
    props: (route) => {
      const name = route.path.split('/docs/vue/')[1].split('/')[0];
      return { layoutName: 'components', name, showApi: true };
    },
    children: [
      {
        path: 'docs/vue/customize-theme',
        component: () => import('../vueDocs/customize-theme.zh-CN.md'),
      },
      {
        path: 'docs/vue/getting-started',
        component: () => import('../vueDocs/getting-started.zh-CN.md'),
      },
      {
        path: 'docs/vue/i18n',
        component: () => import('../vueDocs/i18n.zh-CN.md'),
      },
      {
        path: 'docs/vue/introduce',
        component: () => import('../vueDocs/introduce.zh-CN.md'),
      },
      {
        path: 'docs/vue/use-with-vue-cli',
        component: () => import('../vueDocs/use-with-vue-cli.zh-CN.md'),
      },
      {
        path: 'docs/vue/faq',
        component: () => import('../vueDocs/faq.zh-CN.md'),
      },
      {
        path: 'docs/vue/download',
        component: () => import('../vueDocs/download.zh-CN.md'),
      },
      {
        path: 'docs/vue/sponsor',
        component: () => import('../vueDocs/sponsor.zh-CN.md'),
      },
      {
        path: 'docs/vue/changelog',
        component: () => import('../../CHANGELOG.zh-CN.md'),
      },
      { path: '', redirect: '/vue/docs/introduce/' },
    ],
  },
  { path: '/*', redirect: '/docs/vue/introduce/' },
];

export default new VueRouter({
  mode: 'history',
  fallback: false,
  routes,
  scrollBehavior: (to) => {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
});

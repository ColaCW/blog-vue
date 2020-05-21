import Vue from 'vue';
import Router from 'vue-router';
import blogIndex from '@/pages/blogIndex';
import blogList from '@/pages/blogList';
import blogDetail from '@/pages/blogDetail';
import resourceShare from '@/pages/resourceShare';
import webIntroduce from '@/pages/webIntroduce';
import aboutMe from '@/pages/aboutMe';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'blogIndex',
      component: blogIndex
    },
    {
      path: '/blogList/:categary',
      name: 'blogList',
      component: blogList
    },
    {
      path: '/blogDetail/:id',
      name: 'blogDetail',
      component: blogDetail
    },
    {
      path: '/resourceShare',
      name: 'resourceShare',
      component: resourceShare
    },
    {
      path: '/webIntroduce',
      name: 'webIntroduce',
      component: webIntroduce
    },
    {
      path: '/aboutMe',
      name: 'aboutMe',
      component: aboutMe
    }
  ]
});

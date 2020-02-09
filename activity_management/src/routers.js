import React from 'react';
import App from './App';
import Home from './pages/home/Home';
import Login from './pages/Login/Login';
import activitySquare from '../src/pages/activititySquare/activitySquare';
import ActivityDetail from '../src/pages/activityDetail/activityDetail';
import Mine from '../src/pages/mine/Mine'

export default [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/home',
        component: Home,
        exact: true
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/activitySquare',
        component: activitySquare,
        loadData: activitySquare.loadData,
      },
      {
        path: '/activityDetail',
        component: ActivityDetail
      },
      {
        path: '/mine',
        component: Mine
      }
    ]
  }
]

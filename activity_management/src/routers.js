import React from 'react';
import App from './App';
import Home from './pages/home/Home';
import Login from './pages/Login/Login';
import activitySquare from '../src/pages/activititySquare/activitySquare'

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
      }
      // {
      //   path:'/demo',
      //   component: Demo
      // }
    ]
  }
]

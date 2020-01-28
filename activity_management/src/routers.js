import React from 'react';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
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
      }
    ]
  }
]

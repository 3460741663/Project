import React from 'react';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login'

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
      }
    ]
  }
]

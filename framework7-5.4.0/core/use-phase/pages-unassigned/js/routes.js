var routes = [
  // Index page
    {
        path: '/',
        url: './index.html',
        name: 'home',
  },
  // start page
    {
        path: '/start/',
        url: '../../login-phase/index.html',
        name: 'start',
  },
  // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
  },
];

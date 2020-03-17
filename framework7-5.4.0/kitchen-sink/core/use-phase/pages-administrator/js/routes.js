var routes = [
  // Index page
    {
        path: '/',
        url: './index.html',
        name: 'home',
  },
  // About page
    {
        path: '/about/',
        url: './pages/about.html',
        name: 'about',
  },
    // Login page
    {
        path: '/login/',
        url: './pages/login.html',
        name: 'login',
  },
       // Register page
    {
        path: '/register/',
        url: './pages/register.html',
        name: 'register',
  },
  // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
  },
];

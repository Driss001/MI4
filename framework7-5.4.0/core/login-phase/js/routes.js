var routes = [
    // Index page
    {
        path: '/',
        url: './index.html',
        name: 'home',
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
    // Request Verify Mail page
    {
        path: '/request-verify/',
        url: './pages/request-verify.html',
        name: 'request-verify',
  },
  // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
  },
];

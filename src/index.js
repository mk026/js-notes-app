import NavController from './controllers/Nav.controller';
import NavView from './views/Nav.view';

const appRoot = document.getElementById('app');

const routes = [
  { name: 'Home', path: '/home' },
  { name: 'Notes', path: '/notes' },
  { name: 'Projects', path: '/projects' },
];

const navView = new NavView();
const navController = new NavController(appRoot, navView, routes);

navController.init();

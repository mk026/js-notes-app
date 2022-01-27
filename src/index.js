import NavController from './controllers/Nav.controller';
import NavView from './views/Nav.view';

const appRoot = document.getElementById('app');

const navView = new NavView();
const navController = new NavController(appRoot, navView);

navController.init();

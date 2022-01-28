import NavController from './controllers/Nav.controller';
import HomeController from './controllers/Home.controller';
import NotesController from './controllers/Notes.controller';

import NavView from './views/Nav.view';
import HomeView from './views/Home.view';
import NotesView from './views/Notes.view';

import Route from './router/Route';

const appRoot = document.getElementById('app');

const homeView = new HomeView();
const notesView = new NotesView();

const homeController = new HomeController(homeView);
const notesController = new NotesController(notesView);

const routes = [
  new Route('Home', '/', homeController),
  new Route('Notes', '/notes', notesController),
];

const navView = new NavView();
const navController = new NavController(appRoot, navView, routes);

navController.init();

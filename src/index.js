import NavController from './controllers/Nav.controller';
import HomeController from './controllers/Home.controller';
import NotesController from './controllers/Notes.controller';

import NavView from './views/Nav.view';
import HomeView from './views/Home.view';
import NotesView from './views/Notes.view';

import NotesModel from './models/Notes.model';

import Route from './router/Route';
import Router from './router/Router';

import { dummyNotes } from './utils';

const appRoot = document.getElementById('app');

const notesModel = new NotesModel(dummyNotes);

const homeView = new HomeView();
const notesView = new NotesView();

const homeController = new HomeController(appRoot, homeView);
const notesController = new NotesController(appRoot, notesView, notesModel);

const routes = [
  new Route('Home', '/', homeController),
  new Route('Notes', '/notes', notesController),
];

const router = new Router(routes);

const navView = new NavView();
const navController = new NavController(appRoot, navView, router);

navController.init();

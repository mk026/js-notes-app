import NavController from './controllers/Nav.controller';
import HomeController from './controllers/Home.controller';
import NotesController from './controllers/Notes.controller';
import TodosController from './controllers/Todos.controller';

import NavView from './views/Nav.view';
import HomeView from './views/Home.view';
import NotesView from './views/Notes.view';
import TodosView from './views/Todos.view';

import NotesModel from './models/Notes.model';

import Route from './router/Route';
import Router from './router/Router';

import { getDummyNotes } from './utils';

const appRoot = document.getElementById('app');

const notesModel = new NotesModel(getDummyNotes(6));

const homeView = new HomeView();
const notesView = new NotesView();
const todosView = new TodosView();

const homeController = new HomeController(appRoot, homeView);
const notesController = new NotesController(appRoot, notesView, notesModel);
const todosController = new TodosController(appRoot, todosView);

const routes = [
  new Route('Home', '/', homeController),
  new Route('Notes', '/notes', notesController),
  new Route('Todos', '/todos', todosController),
];

const router = new Router(routes);

const navView = new NavView();
const navController = new NavController(appRoot, navView, router);

navController.init();

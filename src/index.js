import NavController from './controllers/Nav.controller';
import HomeController from './controllers/Home.controller';
import NotesController from './controllers/Notes.controller';
import TodosController from './controllers/Todos.controller';
import AuthController from './controllers/Auth.controller';

import NavView from './views/Nav.view';
import HomeView from './views/Home.view';
import NotesView from './views/notes/Notes.view';
import TodosView from './views/todos/Todos.view';
import AuthView from './views/Auth.view';

import NotesModel from './models/Notes.model';
import TodosModel from './models/Todos.model';

import Route from './router/Route';
import Router from './router/Router';

import NotesService from './services/Notes.service';
import TodosService from './services/Todos.service';
import AuthService from './services/Auth.service';

const appRoot = document.getElementById('app');

const apiBaseUrl = 'http://localhost:8080/api';

const authService = new AuthService(apiBaseUrl);
const notesService = new NotesService(apiBaseUrl, authService);
const todosService = new TodosService(apiBaseUrl, authService);

const notesModel = new NotesModel(notesService);
const todosModel = new TodosModel(todosService);

const homeView = new HomeView();
const notesView = new NotesView();
const todosView = new TodosView();
const authView = new AuthView();

const homeController = new HomeController(appRoot, homeView);
const notesController = new NotesController(appRoot, notesView, notesModel);
const todosController = new TodosController(appRoot, todosView, todosModel);
const authController = new AuthController(appRoot, authView, authService);

const routes = [
  new Route('Home', '/', homeController),
  new Route('Notes', '/notes', notesController, true),
  new Route('Todos', '/todos', todosController, true),
  new Route('Auth', '/auth', authController),
];

const router = new Router(routes, authService);

const navView = new NavView();
const navController = new NavController(appRoot, navView, router, authService);

navController.init();

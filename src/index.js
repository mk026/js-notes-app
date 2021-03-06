import NavController from './controllers/Nav.controller';
import HomeController from './controllers/Home.controller';
import NotesController from './controllers/Notes.controller';
import TodosController from './controllers/Todos.controller';
import AuthController from './controllers/Auth.controller';
import AccountController from './controllers/Account.controller';

import NavView from './views/Nav.view';
import HomeView from './views/Home.view';
import NotesView from './views/notes/Notes.view';
import TodosView from './views/todos/Todos.view';
import AuthView from './views/auth/Auth.view';
import AccountView from './views/account/Account.view';

import NotesModel from './models/Notes.model';
import TodosModel from './models/Todos.model';
import UserModel from './models/User.model';

import Route from './router/Route';
import Router from './router/Router';

import NotesService from './services/Notes.service';
import TodosService from './services/Todos.service';
import UserService from './services/User.service';
import AuthService from './services/Auth.service';

import { API_BASE_URL, AccessMode, Paths } from './config';

import './styles/index.css';

const appRoot = document.getElementById('app');

const authService = new AuthService(API_BASE_URL);
const userService = new UserService(API_BASE_URL, authService);
const notesService = new NotesService(API_BASE_URL, authService);
const todosService = new TodosService(API_BASE_URL, authService);

const notesModel = new NotesModel(notesService);
const todosModel = new TodosModel(todosService);
const userModel = new UserModel(userService);

authService.setUserModel(userModel);

const homeView = new HomeView();
const notesView = new NotesView();
const todosView = new TodosView();
const authView = new AuthView();
const accountView = new AccountView();

const homeController = new HomeController(
  appRoot,
  homeView,
  authService,
  userModel
);
const notesController = new NotesController(appRoot, notesView, notesModel);
const todosController = new TodosController(appRoot, todosView, todosModel);
const authController = new AuthController(appRoot, authView, authService);
const accountController = new AccountController(
  appRoot,
  accountView,
  authService,
  userModel
);

const routes = [
  new Route('Home', Paths.HOME, homeController, AccessMode.ALL),
  new Route('Notes', Paths.NOTES, notesController, AccessMode.AUTH),
  new Route('Todos', Paths.TODOS, todosController, AccessMode.AUTH),
  new Route('Auth', Paths.AUTH, authController, AccessMode.UNAUTH),
  new Route('Account', Paths.ACCOUNT, accountController, AccessMode.AUTH),
];

const router = new Router(routes, authService);

const navView = new NavView();
const navController = new NavController(appRoot, navView, router, authService);

navController.init();

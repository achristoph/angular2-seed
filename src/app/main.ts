import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {TaskService} from './services/task.service';
import {Home} from './components/home/home';
import {About} from './components/about/about';
import {RepoBrowser} from './components/repo-browser/repo-browser';
import {TaskComponent} from './components/task/task';

@Component({
  selector: 'app',
  providers: [TaskService],
  pipes: [],
  directives: [ROUTER_DIRECTIVES],
  template: require('./app.html')
})
@RouteConfig([
  {path: '/home', component: Home, name: 'Home'},
  {path: '/about', component: About, name: 'About'},
  {path: '/github/...', component: RepoBrowser, name: 'RepoBrowser'},
  {path: '/Task', component: TaskComponent, name: 'Task', useAsDefault: true}
])
export class App {

  constructor() {
  }

}

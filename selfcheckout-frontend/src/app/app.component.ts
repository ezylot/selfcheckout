import { Component } from '@angular/core';
import { PermissionService } from './services/permission.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(readonly permissionService: PermissionService) {
  }

  login() {
    const password = prompt("Enter password");
    if(password !== null) this.permissionService.login(password);
  }

  isLoggedIn() {
    return this.permissionService.isLoggedIn();
  }

  logout() {
    this.permissionService.logout();
  }
}

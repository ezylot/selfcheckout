import {Injectable, isDevMode} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private loggedIn: Date | null = null;
  private password = 1234;

  constructor() { }

  public login(password: string) {
    if(password.toString() === this.password.toString()) {
      this.loggedIn = new Date();
    }
  }

  public logout() {
    this.loggedIn = null;
  }

  public isLoggedIn() : boolean {
    return (isDevMode() || this.loggedIn !== null && new Date().getDate() - this.loggedIn.getDate() < 30 * 60 * 1000);
  }
}

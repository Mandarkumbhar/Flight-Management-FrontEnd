import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private router: Router,
    private authService: AuthenticationService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  let b = sessionStorage.getItem("role");
  console.log(b);
  if(this.authService.isUserLoggedIn() && (b == "ADMIN")){
     return true;}
  else if(this.authService.isUserLoggedIn() && (b == "USER")){
    this.router.navigate(['error']);
    return true;
  }
  else{
    this.router.navigate(['login']);
     return false;}
  }

}

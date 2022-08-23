import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  
  constructor(private router: Router,
    private authService: AuthenticationService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  let b = sessionStorage.getItem("role");
  console.log(b);
  console.log(b=="USER");
  if(this.authService.isUserLoggedIn() && (b == "USER")){
     return true;}
  else if(this.authService.isUserLoggedIn() && (b == "ADMIN")){
    this.router.navigate(['/error']);
      return true;
    }
  else{
    this.router.navigate(['/login']);
     return false;}
  }

}

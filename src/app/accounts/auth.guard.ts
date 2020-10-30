import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.authUser$.pipe(
        take(1),
        map(authUser => {
          const isAuthenticated = !!authUser;
          if (isAuthenticated)
            return true;
          else {
            this.router.navigate(['/accounts/signin'], { queryParams: { return: state.url }})
            return false;
          }
        })
      )
  }
  
}

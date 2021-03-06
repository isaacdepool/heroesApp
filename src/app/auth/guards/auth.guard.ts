import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate{

  constructor( private authSvc: AuthService,
               private router: Router ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authSvc.verificaAuth()
      .pipe(
        tap( estaAuth => {
          if(!estaAuth){
            this.router.navigate(['./auth/login'])
          }
        })
      );

    // if(this.authSvc.auth.id){
    //     return true;
    //   }
      
    // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      
    return this.authSvc.verificaAuth()
    .pipe(
      tap( estaAuth => {
        if(!estaAuth){
          this.router.navigate(['./auth/login'])
        }
      })
    );

  //     if(this.authSvc.auth.id){
  //       return true;
  //     }
      
  //   return false;
  }
}

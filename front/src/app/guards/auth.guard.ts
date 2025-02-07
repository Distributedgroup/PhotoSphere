import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router:Router,
    private _userService:UserService
  ){
    
  }
  
  canActivate():any{
    let access = this._userService.isAuthenticate();

    if(!access) this._router.navigate(['/login']);

    return true;
  }
  
}

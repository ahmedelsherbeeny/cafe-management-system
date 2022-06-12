import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { globalVariables } from '../shared/global-variable';
import { AuthServiceService } from './auth-service.service';
import { OpensnackbarService } from './opensnackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardService {

  constructor(private router: Router, private auth: AuthServiceService, private snackbar: OpensnackbarService) { }
  canActivate(acroute: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray = acroute.data
    expectedRoleArray = expectedRoleArray.expectedRole
    const token: any = localStorage.getItem('token')
    var tokenPayload: any
    try {
      tokenPayload = jwt_decode(token)

    }
    catch (err) {
      localStorage.clear()
      this.router.navigate(['/'])
    }
    let checkRole = false
    for (let i = 0; i < expectedRoleArray.length; i++) {
      if (expectedRoleArray[i] == tokenPayload.role) {
        checkRole = true

      }
    }
    if (tokenPayload.role == 'user' || tokenPayload.role == 'admin') {
      if (checkRole) {
        localStorage.setItem('role', tokenPayload.role)

        return true

      }
      this.snackbar.openSnackBar(globalVariables.unauthorized, globalVariables.error)
      this.router.navigate(['/cafe/dashboard'])
      return false


    }
    else {
      
      this.router.navigate(['/'])

      localStorage.clear()
      return false
    }



  }
}

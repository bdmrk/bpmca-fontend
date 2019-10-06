import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {HelperService} from '../service/common/helper.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private helper: HelperService,
        private router: Router,
       
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.helper.isAuthorized()) {
            return true;
        }
        else {
            this.router.navigate(['/login'],{queryParams:{'redirectURL':state.url}});
            return true;
        }
    }
}

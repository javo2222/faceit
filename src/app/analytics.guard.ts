import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

declare var ga: any;

@Injectable()
export class AnalyticsGuard implements CanActivate {

  constructor() {
  };

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    ga('send', 'pageview', state.url);
    return true;
  }

}

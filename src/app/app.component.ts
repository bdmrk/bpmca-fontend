import { Component, OnDestroy } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  loader = true;
  subscription: SubscriptionLike;

  constructor(private router: Router) {
    this.subscription = router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loader = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loader = false;
      }
    });
// alert(window.innerWidth);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

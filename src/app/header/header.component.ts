import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../accounts/auth.service';
import { AuthUser } from '../accounts/auth-user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  username:string;
  private authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authUser$.subscribe((authUser: AuthUser) => {
      console.log("HeaderComponent");
      this.isAuthenticated = !!authUser;
      if (this.isAuthenticated) {
        this.username = authUser.username
      }
    });
  }

  onSignOut() {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}

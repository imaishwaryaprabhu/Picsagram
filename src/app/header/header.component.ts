import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../accounts/auth.service';
import { AuthUser } from '../accounts/auth-user.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  username:string;
  private authSubscription: Subscription;

  constructor(private authService: AuthService, public dialog: MatDialog) { }

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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { 
        'title': "Confirm Signout",
        'question': "Are you sure want to signout?"
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.authService.signOut();
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}

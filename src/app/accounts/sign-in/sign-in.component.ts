import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first, debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  hide = true;
  isLoading = false;
  returnUrl: string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['return'] || '/';
  }

  onSignIn(form: NgForm) {
    if (form.invalid) 
      return false;
    
    this.isLoading = true;
    this.authService.signIn(form.value.email, form.value.password)
    .pipe(first(), debounceTime(5000))
    .subscribe(userData => {
      this.isLoading = false;
      this.router.navigate([this.returnUrl]);
    })
  }
}

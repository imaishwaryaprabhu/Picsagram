import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  hide = true;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignUp(form: NgForm) {
    if(form.invalid)
      return false;
    
    this.authService.signUp(form.value)
    .pipe(first(), debounceTime(1000))
    .subscribe(userData => {
      this.isLoading = false;
      this.router.navigate(['/posts']);
    })
  }

}

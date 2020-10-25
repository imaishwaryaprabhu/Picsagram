import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  hide = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSignIn(form: NgForm) {
    console.log(form);
  }
}

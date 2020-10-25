import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  hide = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSignUp(form: NgForm) {
    console.log(form);
  }

}

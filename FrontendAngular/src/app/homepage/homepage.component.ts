import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  message = "";
  userInfoForm = new FormGroup({
    currentAge: new FormControl(25, [Validators.required]),
    retirementAge: new FormControl(60, [Validators.required]),
    deathAge: new FormControl(60, [Validators.required]),
    // email: new FormControl('', [Validators.required, Validators.email]),
    // body: new FormControl('', Validators.required)
  });
  submitted = false;

  constructor() { }

  ngOnInit(): void {
    this.message = "first message";
  }

  submitUserInfo() {
    this.submitted = true;
  }

  get uif() {
    return this.userInfoForm.controls;
  }
}

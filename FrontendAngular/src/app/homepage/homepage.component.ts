import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupName } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  retirementForm: FormGroup;
  submitted = false;
  total = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForms();
    this.initSubscribers();
  }

  initForms() {
    this.retirementForm = this.fb.group({
      currentAge: [25, [Validators.required]],
      retirementAge: [60, [Validators.required]],
      deathAge: [90, [Validators.required]],
      expenses: this.fb.group({
        homeCosts: [615, [Validators.required]],
        carCosts: [220, [Validators.required]],
        healthcare: [600, [Validators.required]],
        food: [600, [Validators.required]],
        vacation: [250, [Validators.required]],
        personal: [500, [Validators.required]],
      })
    });
    const expenses = this.retirementForm.controls.expenses as FormGroup;
    this.total = Object.keys(expenses.controls).reduce((acc, cur) => expenses.get(cur).value + acc, 0);
  }

  initSubscribers() {
    this.retirementForm.valueChanges.subscribe(val => {
      const expenses: any = val.expenses;
      this.total = Object.keys(expenses).reduce((acc, cur) => expenses[cur] + acc, 0);
    });
  }

  submitUserInfo() {
    console.log("submitting");
    this.submitted = true;
  }

  formatMoney(ctrlName: string) {
    const ctrl: FormControl = this.retirementForm.controls[ctrlName] as FormControl;
    let value = ctrl.value;
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    value = '$'+value;
    ctrl.setValue(value);
  }

  unformatMoney(ctrlName: string) {
    const ctrl: FormControl = this.retirementForm.controls[ctrlName] as FormControl;
    let value = ctrl.value;
    value = value.replace(new RegExp("\\$", "g"), ""); // two different ways to do this
    value = value.split(",").join("");
    ctrl.setValue(value);
  }

  get rf() {
    return this.retirementForm.controls;
  }
}

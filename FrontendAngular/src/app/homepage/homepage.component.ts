import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupName } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  retirementForm: FormGroup;
  assets = 0;
  healthcare = 0;
  food = 0;
  vacation = 0;
  personal = 0;
  baseMonthlyCosts = 0;
  totalCosts = 0;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForms();
    this.initSubscribers();
  }

  initForms() {
    this.retirementForm = this.fb.group({
      currentAge: [23, [Validators.required]],
      retirementAge: [60, [Validators.required]],
      deathAge: [90, [Validators.required]],
      expenses: this.fb.group({
        homeCosts: [615],
        carCosts: [220],
        healthcare: [600],
        groceries: [400],
        restaurants: [400],
        vacation: [300],
        personal: [500],
      })
    });
    const expenses = (this.retirementForm.controls.expenses as FormGroup).controls;
    this.assets = (expenses.homeCosts.value | 0) + (expenses.carCosts.value | 0);
    this.healthcare = (expenses.healthcare.value | 0);
    this.food = (expenses.groceries.value | 0) + (expenses.restaurants.value | 0);
    this.vacation = (expenses.vacation.value | 0);
    this.personal = (expenses.personal.value | 0);
    this.baseMonthlyCosts = this.assets + this.healthcare + this.food + this.vacation + this.personal;
    this.calcTotalCosts();
  }

  initSubscribers() {
    (this.retirementForm.get("expenses") as FormGroup).valueChanges.subscribe(val => {
      const expenses: any = val;
      this.assets = (expenses.homeCosts | 0) + (expenses.carCosts | 0);
      this.healthcare = (expenses.healthcare | 0);
      this.food = (expenses.groceries | 0) + (expenses.restaurants | 0);
      this.vacation = (expenses.vacation | 0);
      this.personal = (expenses.personal | 0);
      this.baseMonthlyCosts = this.assets + this.healthcare + this.food + this.vacation + this.personal;
    });
    this.retirementForm.valueChanges.subscribe(val => {
      this.calcTotalCosts();
    })
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

  calcMonthlyCostsAtAge(targetAge: number): number {
    const currentAge = this.retirementForm.controls.currentAge.value;
    return this.baseMonthlyCosts * Math.pow(1.025, (targetAge - currentAge));
  }

  calcTotalCosts() {
    this.totalCosts = 0;
    const retirementAge = this.retirementForm.controls.retirementAge.value;
    const deathAge = this.retirementForm.controls.deathAge.value;
    for (let i = retirementAge; i <= deathAge; i++) {
      this.totalCosts += this.calcMonthlyCostsAtAge(i) * 12;
    }
  }

  get rf(): any {
    return this.retirementForm.controls;
  }
}

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
    this.initFormsAndFields();
    this.initSubscribers();
  }

  initFormsAndFields() {
    this.retirementForm = this.fb.group({
      currentAge: ['', [Validators.required]],
      retirementAge: ['', [Validators.required]],
      deathAge: ['', [Validators.required]],
      expenses: this.fb.group({
        homeCosts: [''],
        carCosts: [''],
        healthcare: [''],
        groceries: [''],
        restaurants: [''],
        vacation: [''],
        personal: [''],
      })
    });
    this.assets = 0;
    this.healthcare = 0;
    this.food = 0;
    this.vacation = 0;
    this.personal = 0;
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
    const retirementAge = (this.retirementForm.controls.retirementAge.value | 0);
    const deathAge = this.retirementForm.controls.deathAge.value;
    for (let i = retirementAge; i <= deathAge; i++) {
      this.totalCosts += this.calcMonthlyCostsAtAge(i) * 12;
    }
  }

  get rf(): any {
    return this.retirementForm.controls;
  }
}

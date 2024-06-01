import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  dateInputForm!: FormGroup;
  currentYear: number = new Date().getFullYear();
  currentDate: Date = new Date();
  years!: number | string;
  months!: number | string;
  days!: number | string;
  validLastDay: boolean = true;
  yearCounter!: number;
  monthCounter!: number;
  dayCounter!: number;
  yearDisplay!: string;
  monthDisplay!: string;
  dayDisplay!: string;
  emptyFields: boolean = false;
  validFullDate: boolean = true;

  constructor(private formBuilder: FormBuilder) {
    this.dateInputForm = this.formBuilder.group({
      dayInput: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      monthInput: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      yearInput: ['', [Validators.required, Validators.max(this.currentYear)]],
    });
  }

  ngOnInit(): void {
    this.dateDisplay();
  }

  onSubmit(): void {
    const dayValue: number = this.dateInputForm.value.dayInput;
    const monthValue: number = this.dateInputForm.value.monthInput;
    let yearValue: number = this.dateInputForm.value.yearInput;


    if (this.dateInputForm.valid && this.isValidLastDayOfMonth(dayValue, monthValue, yearValue) &&this.isFullDateInThePast(dayValue, monthValue, yearValue)) {
      this.emptyFields = false;
      this.years = this.currentDate.getFullYear() - yearValue;
      this.months = this.currentDate.getMonth() + 1 - monthValue;
      this.days = this.currentDate.getDate() - dayValue;

      console.log("days: " + this.days);
      if (this.days < 0) {
        this.months--;
        let lastMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0);
        this.days += lastMonth.getDate();
      }

      if (this.months < 0) {
        this.years--;
        this.months += 12;
      }

      setTimeout(() => {
      this.yearCounter = 0;
      this.monthCounter = 0;
      this.dayCounter = 0;

      let yearCounterStop = setInterval(() => {
        if (this.years === 0) {
          this.yearDisplay = this.years.toString();
          clearInterval(yearCounterStop);
        }else {
          this.yearCounter++;
          this.yearDisplay = this.yearCounter.toString();

          if (this.yearCounter == this.years) {
            clearInterval(yearCounterStop);
          }
        }
      }, 10);

      let monthCounterStop = setInterval(() => {
        if (this.months === 0){
          this.monthDisplay = this.months.toString();
          clearInterval(monthCounterStop);
        }else {
            this.monthCounter++;
            this.monthDisplay = this.monthCounter.toString();

            if (this.monthCounter == this.months) {
              clearInterval(monthCounterStop);
            }
        }
      }, 10);

      let dayCounterStop = setInterval(() => {
        if (this.days === 0){
          this.dayDisplay = this.days.toString();
          clearInterval(dayCounterStop);
        }else {
            this.dayCounter++;
            this.dayDisplay = this.dayCounter.toString();

            if (this.dayCounter == this.days) {
              clearInterval(dayCounterStop);
            }
        }
      }, 10);
    });
    } else {
      this.emptyFields = true;
      this.dateDisplay();
    }
   }

  isValidLastDayOfMonth(day: number, month: number, year: number): boolean {
    let inputLastDayOfMonth = new Date(year, month, 0);

    if (day <= inputLastDayOfMonth.getDate()) {
      return this.validLastDay = true;
    } else {
      this.dateDisplay();
      return false;
    }
  }

  isFullDateInThePast(day: number, month: number, year: number):boolean {
    let fullInputDate = new Date(year + "/"+ month + "/" + day);

    if (fullInputDate <= this.currentDate) {
      return this.validFullDate = true;
    }else {
      this.dateDisplay();
      return this.validFullDate = false;
    }
  }

  dateDisplay():void {
    this.yearDisplay = '--';
    this.monthDisplay = '--';
    this.dayDisplay = '--';
  }
}

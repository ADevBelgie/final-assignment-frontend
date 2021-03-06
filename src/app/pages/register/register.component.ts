import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private alertService: AlertService
  ) {
      // redirect to home if already logged in
      console.log(localStorage.getItem('user'))
      if (localStorage.getItem('user') != null) {
        console.log("already logged in")
        this.router.navigate(['/']);
      }
      this.form = this.formBuilder.group({
        //firstName: ['', Validators.required],
        //lastName: ['', Validators.required],
        email: ['', Validators.email],
        username: ['', Validators.required],
        passwordHash: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }
      console.log(this.form.value)
      this.loading = true;
      this.accountService.register(this.form.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                  this.router.navigate(['../login'], { relativeTo: this.route });
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}

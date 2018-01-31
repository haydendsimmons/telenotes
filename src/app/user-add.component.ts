import 'rxjs/add/operator/switchMap';
import {Component} from '@angular/core';
import {User} from './user';
import {Router} from '@angular/router';
import {UserService} from "./user.service";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Location} from "@angular/common";

@Component({
  selector: 'add-user',
  templateUrl: './user-add.component.html',
  styleUrls: ['./app.component.css']
})

export class UserAddComponent {
  userAddForm: FormGroup;
  user = new User();

  constructor(private userService: UserService,
              private router: Router,
              private location: Location,
              private formBuilder: FormBuilder) {
    this.buildForm();
  };

  buildForm(): void {
    this.userAddForm = this.formBuilder.group({
      CompanyID: ['', Validators.required],
      AccountID: ['', Validators.required],
      CompanyName: ['', Validators.required],
      StreetAddress: ['', Validators.required],
      StreetAddress2: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      ZipCode: ['', Validators.required],
      webSite: ['', Validators.required],
      CreatedDate: ['', Validators.required]
    });
  }

  add(): void {
    let user = this.userAddForm.value as User;
    this.userService.add(user)
      .then(response => {
        console.log('response', response);
        this.router.navigate(['/users']);
      })
  }

  goBack(): void {
    this.location.back();
  }
}

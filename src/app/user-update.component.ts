import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from "./user.service";
import {Location} from '@angular/common';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'update-user',
  templateUrl: './user-update.component.html',
  styleUrls: ['./app.component.css']
})

export class UserUpdateComponent implements OnInit {
  userUpdateForm: FormGroup;
  user: User;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private formBuilder: FormBuilder) {
  };

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(params['id']))
      .subscribe(user => {
        this.user = user;
        this.buildForm();
      });
  }

  buildForm(): void {
    this.userUpdateForm = this.formBuilder.group({
      CompanyID: [this.user.CompanyID, Validators.required],
      AccountID: [this.user.AccountID, Validators.required],
      CompanyName: [this.user.CompanyName, Validators.required],
      StreetAddress: [this.user.StreetAddress],
    });
  }

  update(): void {
    let user = this.userUpdateForm.value as User;
    this.userService.update(user)
      .then(() => {
        this.router.navigate(['/users']);
      })
  }

  goBack(): void {
    this.location.back();
  }
}

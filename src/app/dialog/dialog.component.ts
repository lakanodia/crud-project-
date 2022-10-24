import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Role {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  hide = true;
  registerForm!: FormGroup;
  roles: Role[] = [];
  actionBtn: string = 'Save';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      password: ['', Validators.required],
      roleID: ['', Validators.required],
    });
    this.getAllRoles();

    if (this.editData) {
      this.actionBtn = 'Update';
      this.registerForm.controls['username'].setValue(this.editData.username);
      this.registerForm.controls['firstName'].setValue(this.editData.firstName);
      this.registerForm.controls['lastName'].setValue(this.editData.lastName);
      this.registerForm.controls['birthDate'].setValue(this.editData.birthDate);
      this.registerForm.controls['password'].setValue(this.editData.password);
      this.registerForm.controls['roleID'].setValue(this.editData.roleID);
    }
  }

  getAllRoles() {
    this.api.getRoles().subscribe((res) => {
      console.log(res);
      this.roles = res;
    });
  }

  onRegister() {
    if (!this.editData) {
      if (this.registerForm.valid) {
        this.api.registerUser(this.registerForm.value).subscribe({
          next: (res) => {
            alert('You Register Successfully');
            this.registerForm.reset();
          },
          error: () => {
            alert('Error While Registering');
          },
        });
      }
    } else {
      this.onUpdateUser();
    }
  }

  onUpdateUser() {
    console.log(this.api.updateUser(this.registerForm.value, this.editData.id));
    this.api
      .updateUser(this.registerForm.value, this.editData.id)
      .subscribe((res) => {
        alert('User Updated Successfully');
        this.registerForm.reset();
      });
  }

  getAllUsers() {
    throw new Error('Method not implemented.');
  }
}

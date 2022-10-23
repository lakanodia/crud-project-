import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

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

  constructor(private fb: FormBuilder, private api: ApiService) {}

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
  }

  getAllRoles() {
    this.api.getRoles().subscribe((res) => {
      console.log(res);
      this.roles = res;
    });
  }

  onRegister() {
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
  }
}

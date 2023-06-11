import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // ==========================================
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    // ====
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(10),
    ]),
    // ====
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  // ==========================================
  isSubmit = false;
  get userData() {
    return this.registerForm.controls;
  }
  // ==========================================
  data: any = [];
  handleSubmit(name: any, email: any) {
    this.isSubmit = true;
    // ========
    let user = {
      Name: name,
      Email: email,
    };
    // ========
    localStorage.clear();
    this.data.push(user);
    localStorage.setItem('participant', JSON.stringify(this.data));
  }
  // =========================================
}

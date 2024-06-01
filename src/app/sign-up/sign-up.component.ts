import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required], // Add the 'name' field to the form
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      const { name, email, password } = this.registrationForm.value;
      try {
        await this.authService.registerUser(email, password, name);
        // Redirect to menu page upon successful register
        this.router.navigate(['/menu']);
        console.log('User registered successfully.');
        alert('User registered successfully.');
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  }
}

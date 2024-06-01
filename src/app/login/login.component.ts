import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router module
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  loginError: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router // Inject Router service
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.login(email, password);
        // Redirect to menu page upon successful login
        this.router.navigate(['/menu']); // Navigate to the menu page
        this.loginError = ''; // Clear any previous login error message
        console.log('Logged in successfully');
        alert('Logged in successfully');
      } catch (error) {
        console.error('Login failed:', error);
        
        this.loginError = 'Incorrect email or password';
      }
    }
  }
}

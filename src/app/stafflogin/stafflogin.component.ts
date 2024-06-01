import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-stafflogin',
  templateUrl: './stafflogin.component.html',
  styleUrls: ['./stafflogin.component.css']
})
export class StaffloginComponent {
  staffId: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private authService: AuthenticationService
  ) {}

  async login() {
    if (!this.staffId || !this.password) {
      this.errorMessage = 'Please enter both staff ID and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const user = await this.authService.staffLogin(this.staffId, this.password);
      if (user) {
        this.router.navigate(['/orderDataforemployee']);
      } else {
        this.errorMessage = 'Invalid login credentials';
      }
    } catch (error) {
      console.error('Login error:', error);
      this.errorMessage = 'An error occurred during login. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}

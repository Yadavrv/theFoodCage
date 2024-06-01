import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactQueryService } from '../contact-query.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private comtactQuery: ContactQueryService) {}

  contactForm = this.fb.group({
    name: ['', Validators.required],
    contactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  onSubmit() {
    if (this.contactForm.valid) {
      this.comtactQuery.addContactMessage(this.contactForm.value)
        .then(() => {
          this.successMessage = 'Form submitted successfully!';
          this.errorMessage = null;
          this.contactForm.reset();
        })
        .catch(error => {
          this.errorMessage = 'Error submitting form. Please try again later.';
          this.successMessage = null;
          console.error('Error submitting form:', error);
        });
    } else {
      this.errorMessage = 'Form is invalid. Please check the fields.';
      this.successMessage = null;
    }
  }
}

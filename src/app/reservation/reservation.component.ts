import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservationForm!: FormGroup;

  constructor(private fb: FormBuilder, private reservationService: ReservationService) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      dateOfReservation: ['', Validators.required],
      eventType: ['', Validators.required],
      timeOfEvent: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      this.reservationService.addReservation(this.reservationForm.value)
        .then(() => {
          console.log('Reservation data saved successfully');
          // Optionally reset the form here
          this.reservationForm.reset();
        })
        .catch(error => {
          console.error('Error saving reservation data:', error);
        });
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}

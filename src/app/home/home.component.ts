import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  todayspecial!: string;

  constructor() { }

  ngOnInit(): void {
    const currentDay = new Date().getDay();
    const specials = [
      "Sunday's Special: Dal Makhani",
      "Monday's Special: Delicious Curry Combo",
      "Tuesday's Special: Biryani Bonanza",
      "Wednesday's Special: Tandoori Delight",
      "Thursday's Special: Paneer Tikka Masala",
      "Friday's Special: Vegetable Biryani",
      "Saturday's Special: Palak Paneer"
    ];
    this.todayspecial = specials[currentDay];
  }
}


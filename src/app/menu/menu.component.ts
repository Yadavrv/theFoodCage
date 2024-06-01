import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
 
  todayspecial!: string;

  constructor(private route: ActivatedRoute) { }

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


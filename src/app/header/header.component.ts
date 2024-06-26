import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navbars: boolean = false;
  orderCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.currentOrderCount.subscribe(count => {
      this.orderCount = count;
    });
  }

  openMenu() {
    this.navbars = !this.navbars;
  }
}

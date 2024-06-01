import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FoodService } from '../food.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-employee-order-details',
  templateUrl: './employee-order-details.component.html',
  styleUrls: ['./employee-order-details.component.css']
})
export class EmployeeOrderDetailsComponent implements OnInit, OnDestroy {
  usersWithOrders: any[] = [];
  userSubscription: Subscription | undefined;

  constructor(
    private foodService: FoodService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.fetchUsersWithOrders();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private fetchUsersWithOrders(): void {
    this.userSubscription = this.authService.getAllUsers().subscribe(
      users => {
        console.log('All Users:', users);
        this.usersWithOrders = [];

        users.forEach((user: any) => {
          this.fetchUserOrders(user);
        });
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  private fetchUserOrders(user: any): void {
    this.foodService.getUserOrders(user.id).subscribe(
      orders => {
        console.log(`Orders for User ${user.id}:`, orders);
        this.usersWithOrders.push({ user, orders });
      },
      error => {
        console.error(`Error fetching orders for user ${user.id}:`, error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { FoodItem } from '../foodItem.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from '../authentication.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: FoodItem[] = [];
  totalAmount: number = 0;
  totalAmountWithoutDiscount: number = 0;
  discountAmount: number = 0;
  currentUser: any = {};
  address: string = '';
  contactNumber: string = '';
  showCheckoutForm: boolean = false;
  showNoOrderModal: boolean = false;

  showConfirmation: boolean = false;

  constructor(
    private foodService: FoodService,
    private firestore: AngularFirestore,
    private authService: AuthenticationService,
    private cartService: CartService,
    private router: Router

  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().then(user => {
      if (user) {
        this.authService.getUserData(user.uid).then(userData => {
          this.currentUser = { ...userData };
          this.address = userData.address || '';
          this.contactNumber = userData.contactNumber || '';
        }).catch(console.error);
      }
    }).catch(console.error);

    this.foodService.getOrders().subscribe((orders: FoodItem[]) => {
      this.orders = orders;
      this.calculateTotals();
      this.cartService.changeOrderCount(this.orders.length);
    });
  }

  removeItem(item: FoodItem) {
    this.foodService.removeOrder(item);
    this.calculateTotals();
    this.cartService.changeOrderCount(this.orders.length);
  }

  incrementQuantity(item: FoodItem) {
    const quantity = parseInt(item.quantity) + 1;
    item.quantity = quantity.toString();
    item.totalPrice = (parseFloat(item.price) * quantity).toFixed(2);
    this.calculateTotals();
  }

  decrementQuantity(item: FoodItem) {
    const quantity = parseInt(item.quantity) - 1;
    if (quantity > 0) {
      item.quantity = quantity.toString();
      item.totalPrice = (parseFloat(item.price) * quantity).toFixed(2);
      this.calculateTotals();
    }
  }

  applyDiscount(amount: number): number {
    let discount = 0;
    if (amount >= 1500) {
      const discountRates = [0.15, 0.20, 0.25, 0.30, 0.35];
      const thresholds = [1500, 2000, 2500, 3000, 5000];
      const index = thresholds.findIndex((t, i) => amount >= t && (i === thresholds.length - 1 || amount < thresholds[i + 1]));
      discount = amount * discountRates[index];
      if (amount >= 5000) {
        discount += (amount - discount) * 0.15;
      }
    }
    this.discountAmount = discount;
    return amount - discount;
  }

  calculateTotals() {
    this.totalAmountWithoutDiscount = this.orders.reduce((total, order) => total + parseFloat(order.totalPrice), 0);
    this.totalAmount = this.applyDiscount(this.totalAmountWithoutDiscount);
  }

  proceedToCheckout() {
    this.showNoOrderModal = this.orders.length === 0;
    this.showCheckoutForm = !this.showNoOrderModal;
  }

  confirmBooking() {
    if (!this.address || !this.contactNumber) {
      alert('Please enter your address and contact number.');
      return;
    }

    this.authService.getCurrentUser().then(user => {
      if (user) {
        this.firestore.collection('users').doc(user.uid).update({
          address: this.address,
          contactNumber: this.contactNumber
        }).then(() => this.checkout())
          .catch(console.error);
      }
    }).catch(console.error);
  }

  async checkout() {
    try {
      const user = await this.authService.getCurrentUser();
      if (!user) {
        console.error("User not found.");
        return;
      }
      const userId = user.uid; // Get current user ID
      const timestamp = new Date();
      const orderPromises = this.orders.map(order => {
        order.timestamp = timestamp;
        return this.firestore.collection('userOrders').doc(userId).collection('orders').add(order);
      });

      await Promise.all(orderPromises);
      this.clearOrders(); // Clear orders after saving
      this.showConfirmation = true; // Show confirmation message
    } catch (error) {
      console.error('Error checking out:', error);
    }
  }

  closeConfirmation() {
    this.showConfirmation = false; // Close confirmation message
  }

  private clearOrders() {
    this.foodService.setOrderDetails([]); // Clear orders in the service
    this.cartService.changeOrderCount(0); // Reset order count
  }
  

  signOut() {
    this.authService.logout().then(() => this.router.navigate(['/login']))
      .catch(console.error);
  }
}

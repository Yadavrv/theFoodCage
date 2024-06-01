import { Component, EventEmitter, Output } from '@angular/core';
import { FoodItem } from '../foodItem.model';
import { Router } from '@angular/router';
import { FoodService } from './../food.service';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css'],
})
export class StarterComponent {
  starterFoodItems: FoodItem[] = [];

  
  constructor(private router: Router, private FoodService: FoodService) {}

  ngOnInit() {
    this.loadStarterFoodItems();
  }

  loadStarterFoodItems() {
    this.FoodService.getStarterFoodItems().subscribe(
      (items) => {
        this.starterFoodItems = items;
        console.log('Starter Food Items:', this.starterFoodItems);
      },
      (error) => {
        console.error('Error loading starter food items:', error);
      }
    );
  }
  addToOrder(food: FoodItem) {
    // Convert price to number
    const price = parseFloat(food.price);

    // Ensure quantity is at least 1
    let quantity = parseInt(food.quantity);
    quantity = Math.max(quantity, 1);

    // Add to order
    const totalPrice = price * quantity;
    const orderItem: FoodItem = {
      id:food.id,
      userId:food.userId,
      name: food.name,
      description: food.description,
      price: price.toFixed(2),
      imageUrl: food.imageUrl,
      quantity: quantity.toString(),
      totalPrice: totalPrice.toFixed(2),
      timestamp: new Date() ,
      
    };
    this.FoodService.addOrder(orderItem);

    // Log for debugging
    console.log('Added to Order:', orderItem);
  }
}
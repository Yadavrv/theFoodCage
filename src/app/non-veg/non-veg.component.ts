import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../foodItem.model';
import { Router } from '@angular/router';
import { FoodService } from './../food.service';

@Component({
  selector: 'app-non-veg',
  templateUrl: './non-veg.component.html',
  styleUrls: ['./non-veg.component.css'],
})
export class NonVegComponent implements OnInit {
  
  constructor(private router: Router, private FoodService: FoodService) {}
  nonVegFoodItems: FoodItem[] = [];


  ngOnInit() {
    this.loadNonVegFoodItems();
  }

  loadNonVegFoodItems() {
    this.FoodService.getNonVegFoodItems().subscribe(
      (items) => {
        this.nonVegFoodItems = items;
        console.log('Non-Veg Food Items:', this.nonVegFoodItems);
      },
      (error) => {
        console.error('Error loading non-veg food items:', error);
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
      id: food.id,
      userId: food.userId,
      name: food.name,
      description: food.description,
      price: price.toFixed(2),
      imageUrl: food.imageUrl,
      quantity: quantity.toString(),
      totalPrice: totalPrice.toFixed(2),
      timestamp: new Date(),
    };
    this.FoodService.addOrder(orderItem);

    // Log for debugging
    console.log('Added to Order:', orderItem);
  }
}
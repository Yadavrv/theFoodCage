import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from './../food.service';
import { FoodItem } from '../foodItem.model';

@Component({
  selector: 'app-veg',
  templateUrl: './veg.component.html',
  styleUrls: ['./veg.component.css'],
})
export class VegComponent implements OnInit {
  vegFoodItems: FoodItem[] = [];

  constructor(private router: Router, private foodService: FoodService) {}

  ngOnInit() {
    this.loadVegFoodItems();
  }

  loadVegFoodItems() {
    this.foodService.getVegFoodItems().subscribe(
      (items) => {
        this.vegFoodItems = items;
        console.log('Veg Food Items:', this.vegFoodItems);
      },
      (error) => {
        console.error('Error loading veg food items:', error);
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
      timestamp: new Date(),
      
    };
    this.foodService.addOrder(orderItem);

    // Log for debugging
    console.log('Added to Order:', orderItem);
  }
}
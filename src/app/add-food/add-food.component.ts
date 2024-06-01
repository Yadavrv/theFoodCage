import { Component } from '@angular/core';
import { FoodService } from '../food.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FoodItem } from '../foodItem.model';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css'],
})
export class AddFoodComponent {
  vegFood: FoodItem[] = [
    {
      id: '',
      userId: '',
      price: '360',
      description:
        'Paneer cooked in a creamy and mildly spiced tomato-based gravy.',
      name: 'Paneer Makhani',
      imageUrl: '../../assets/img/foodImg/paneer-makhani.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      description: 'Yellow lentils tempered with spices.',
      name: 'Dal Tadka',
      price: '220',
      imageUrl: '../../assets/img/foodImg/dalTadka.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      price: '245',
      description: 'Mushrooms cooked in a flavorful curry sauce.',
      name: 'Mushroom Curry',
      imageUrl: '../../assets/img/foodImg/mashroomCurry.jpeg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      description: 'Paneer cubes cooked in a spinach-based gravy.',
      price: '335',
      name: 'Palak Pneeer',
      imageUrl: '../../assets/img/foodImg/palak-Pneeer.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      description:
        'A fragrant rice dish loaded with assorted vegetables and aromatic spices.',
      name: 'Veg Biryani',
      price: '210',
      imageUrl: '../../assets/img/foodImg/vegBiryani.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      name: 'Garlic Mushroom',
      description: 'Sautéed mushrooms with garlic and herbs.',
      price: '290',
      imageUrl: '../../assets/img/foodImg/garlicMushroom.jpeg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      description: 'Creamy lentils cooked with spices and finished with cream.',
      name: 'Dal Makhni',
      price: '190',
      imageUrl: '../../assets/img/foodImg/dalMakhni.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      price: '365',
      description: 'Paneer cooked in a rich and creamy tomato gravy.',
      name: 'Paneer Butter Masala',
      imageUrl: '../../assets/img/foodImg/paneerbutter.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
  ];

  NonVegItems: FoodItem[] = [
    {
      id: '',
      userId: '',
      price: '470',
      description:
        'Fresh fish fillet marinated with herbs and spices, grilled to perfection and served with a side of lemon butter sauce.',
      name: 'Grilled Fish Fillet',
      imageUrl: '../../assets/img/foodImg/fish-fillet.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      description:
        'A flavorful Kashmiri dish made with tender mutton cooked in a rich gravy of yogurt, spices, and tomatoes.',
      name: 'Mutton Rogan Josh',
      price: '480',
      imageUrl: '../../assets/img/foodImg/muttonRogan.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      price: '280',
      name: 'Chicken Biryani',
      description:
        'A fragrant rice dish cooked with tender pieces of chicken, spices, and saffron.',
      imageUrl: '../../assets/img/foodImg/chikenbiryani.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      description:
        'Juicy chicken breast marinated with herbs and grilled to perfection, served with a side of vegetables.',
      name: 'Grilled Chicken Breast',
      price: '350',
      imageUrl: '../../assets/img/foodImg/chikengarlic.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      name: 'Egg Curry',
      description:
        'Hard-boiled eggs cooked in a rich and spicy tomato-based gravy, perfect with rice or bread.',
      price: '220',
      imageUrl: '../../assets/img/foodImg/Egg-Curry.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      name: 'Mutton Korma',
      price: '499',
      description:
        'Tender mutton cooked in a creamy and aromatic gravy made with cashews, yogurt, and spices.',
      imageUrl: '../../assets/img/foodImg/muttonkorma.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      name: 'Fish Curry',
      description:
        'A flavorful and spicy curry made with tender fish pieces cooked in a coconut milk-based gravy with aromatic spices.',
      price: '430',
      imageUrl: '../../assets/img/foodImg/Fish-Curry.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      description:
        'A fragrant rice dish cooked with tender pieces of mutton, spices, and saffron, layered and cooked to perfection.',
      price: '460',
      name: 'Mutton Biryani',
      imageUrl: '../../assets/img/foodImg/muttonBiryani.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      name: 'Chicken Tandoori',
      price: '530',
      description:
        'Marinated chicken skewers roasted in a clay oven, served with mint chutney and naan bread.',
      imageUrl: '../../assets/img/foodImg/chikentandoori.jpg',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
  ];

  starterMenu: FoodItem[] = [
    {
      id: '',
      userId: '',
      name: 'Paneer Tikka',
      imageUrl: '../../assets/img/foodImg/paneertikka.jpeg',
      description:
        'Paneer tikka is a popular Indian appetizer made from chunks of paneer marinated in spices and grilled to perfection.',
      price: '310',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      name: 'Paneer Chili',
      imageUrl: '../../assets/img/foodImg/chilli_paneer.jpg',
      description:
        'Paneer chili is a spicy Indo-Chinese dish where cubes of paneer are stir-fried with bell peppers, onions, and chili sauce.',
      price: '310',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      name: 'Corn Fritters',
      imageUrl: '../../assets/img/foodImg/Cornfritters.jpg',
      description:
        'Corn fritters are crispy bites made from a batter of corn kernels, flour, and seasonings, deep-fried until golden brown.',
      price: '310',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      name: 'Corn Chaat',
      imageUrl: '../../assets/img/foodImg/Cornchaat.jpeg',
      description:
        'Corn chaat is a refreshing and tangy snack made with boiled corn kernels mixed with chopped vegetables, spices, and chutneys.',
      price: '310',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      name: 'Corn Tikki',
      imageUrl: '../../assets/img/foodImg/corn_oats_tikki.jpg',
      description:
        'Corn tikki is a savory patty made from mashed corn, potatoes, and spices, shaped into patties and shallow-fried until golden brown.',
      price: '310',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },

    {
      id: '',
      userId: '',
      name: 'Sweet Corn Soup',
      imageUrl: '../../assets/img/foodImg/Sweet-Corn-Soup.jpg',
      description:
        'Sweet corn soup is a comforting and creamy soup made with pureed sweet corn, vegetables, and seasonings.',
      price: '210',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      name: 'Tomato Soup',
      imageUrl: '../../assets/img/foodImg/tomatoSoup.jpeg',
      description:
        'Tomato soup is a classic comfort food made with pureed tomatoes, vegetables, and seasonings, served hot and garnished with fresh herbs.',
      price: '310',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      name: 'Vegetable Soup',
      imageUrl: '../../assets/img/foodImg/vegisoup.jpg',
      description:
        'Vegetable soup is a hearty and nutritious soup made with a variety of vegetables, broth, and seasonings.',
      price: '310',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      name: 'Cream of Mushroom Soup',
      imageUrl: '../../assets/img/foodImg/CreamMushroomSoup.jpeg',
      description:
        'Cream of mushroom soup is a creamy and flavorful soup made with pureed mushrooms, cream, and seasonings.',
      price: '310',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },

    {
      id: '',
      userId: '',
      name: 'Vegetable Spring Rolls',
      imageUrl: '../../assets/img/foodImg/veg-spring-roll.jpg',
      description:
        'Vegetable spring rolls are crispy and delicious snacks made with a mixture of vegetables wrapped in thin pastry sheets and deep-fried.',
      price: '310',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
    {
      id: '',
      userId: '',
      name: 'Stuffed Mushrooms',
      imageUrl: '../../assets/img/foodImg/StuffedMushrooms.jpg',
      description:
        'Stuffed mushrooms are flavorful appetizers where mushroom caps are stuffed with a savory filling of cheese, herbs, and breadcrumbs.',
      price: '310',
      quantity: '1',
      totalPrice: '0',
      timestamp: new Date(),
    },
  ];

  message: string = '';

  constructor(private foodService: FoodService) {}

  
  addAllFoodItemsToFirestore(): void {
    this.foodService.addMultipleFoodItemsToCollection(this.vegFood, 'veg-food-items').subscribe(
      () => {
        console.log('Veg food items added successfully.');
        this.message = 'Veg food items added successfully.';
      },
      error => {
        console.error('Error adding veg food items:', error);
        this.message = 'Error adding veg food items.';
      }
    );

    this.foodService.addMultipleFoodItemsToCollection(this.NonVegItems, 'non-veg-food-items').subscribe(
      () => {
        console.log('Non-veg food items added successfully.');
        this.message = 'Non-veg food items added successfully.';
      },
      error => {
        console.error('Error adding non-veg food items:', error);
        this.message = 'Error adding non-veg food items.';
      }
    );

    this.foodService.addMultipleFoodItemsToCollection(this.starterMenu, 'starter-food-items').subscribe(
      () => {
        console.log('Starter food items added successfully.');
        this.message = 'Starter food items added successfully.';
      },
      error => {
        console.error('Error adding starter food items:', error);
        this.message = 'Error adding starter food items.';
      }
    );
  }

  // foodForm: FormGroup;
  // selectedFile: File | null = null;

  // constructor(private fb: FormBuilder, private foodService: FoodService) {
  //   this.foodForm = this.fb.group({
  //     name: ['', Validators.required],
  //     description: ['', Validators.required],
  //     price: ['', [Validators.required, Validators.min(0)]],

  //     imageUrl: [''],

  //     timestamp: ['']
  //   });

  //   this.foodForm.get('price')?.valueChanges.subscribe(() => this.updateTotalPrice());
  //   this.foodForm.get('quantity')?.valueChanges.subscribe(() => this.updateTotalPrice());
  // }

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0] ?? null;
  // }

  // updateTotalPrice() {
  //   const price = parseFloat(this.foodForm.get('price')?.value) || 0;
  //   const quantity = parseFloat(this.foodForm.get('quantity')?.value) || 0;
  //   const totalPrice = (price * quantity).toFixed(2);
  //   this.foodForm.patchValue({ totalPrice });
  // }

  // onSubmit() {
  //   if (this.foodForm.valid && this.selectedFile) {
  //     const formData = { ...this.foodForm.value, timestamp: new Date() };
  //     this.foodService.addFood(formData, this.selectedFile).subscribe(() => {
  //       this.foodForm.reset();
  //     }, error => {
  //       console.error('Error adding food:', error);
  //     });
  //   }
  // }
}

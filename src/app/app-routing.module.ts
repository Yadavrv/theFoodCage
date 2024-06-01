import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ReservationComponent } from './reservation/reservation.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { StarterComponent } from './starter/starter.component';
import { VegComponent } from './veg/veg.component';
import { NonVegComponent } from './non-veg/non-veg.component';
import { DessertComponent } from './dessert/dessert.component';
import { BeverageComponent } from './beverage/beverage.component';
import { LoginComponent } from './login/login.component';
import { StaffloginComponent } from './stafflogin/stafflogin.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth.guard'; // Import your AuthGuard
import { ProfileOldOrdersComponent } from './profile-old-orders/profile-old-orders.component';
import { EmployeeOrderDetailsComponent } from './employee-order-details/employee-order-details.component';
import { AddFoodComponent } from './add-food/add-food.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard], // Apply AuthGuard to the 'menu' route
    children: [
      {
        path: 'starter',
        component: StarterComponent,
      },
      {
        path: '',
        redirectTo: 'starter',
        pathMatch: 'full',
      },
      {
        path: 'veg',
        component: VegComponent,
      },
      {
        path: 'nonVeg',
        component: NonVegComponent,
      },
      {
        path: 'dessert',
        component: DessertComponent,
      },
      {
        path: 'beverage',
        component: BeverageComponent,
      },
    ],
  },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [AuthGuard], // Apply AuthGuard to the 'reservation' route
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthGuard], // Apply AuthGuard to the 'order' route
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  
  {
    path: 'staffLogin',
    component: StaffloginComponent,
  },
 
  {
    path: 'profile',
    component: ProfileOldOrdersComponent
  },
  { path: 'staff-login', 
  component: StaffloginComponent },
  
  {
    path: 'orderDataforemployee',
    component: EmployeeOrderDetailsComponent
  },
  {
    path: 'addfooditem',
    component: AddFoodComponent
  },
  
  { path: '', redirectTo: '/employee-order-details', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

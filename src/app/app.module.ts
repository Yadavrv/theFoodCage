import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ReservationComponent } from './reservation/reservation.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VegComponent } from './veg/veg.component';
import { NonVegComponent } from './non-veg/non-veg.component';
import { StarterComponent } from './starter/starter.component';
import { DessertComponent } from './dessert/dessert.component';
import { BeverageComponent } from './beverage/beverage.component';
import { LoginComponent } from './login/login.component';
import { StaffloginComponent } from './stafflogin/stafflogin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http'; 
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage/storage.module';
import { ProfileOldOrdersComponent } from './profile-old-orders/profile-old-orders.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { EmployeeOrderDetailsComponent } from './employee-order-details/employee-order-details.component';
import { AddFoodComponent } from './add-food/add-food.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ContactComponent,
    ReservationComponent,
    MenuComponent,
    OrderComponent,
    FooterComponent,
    VegComponent,
    NonVegComponent,
    StarterComponent,
    DessertComponent,
    BeverageComponent,
    LoginComponent,
    SignUpComponent,
    StaffloginComponent,
    SidebarComponent,
    ProfileOldOrdersComponent,
    EmployeeOrderDetailsComponent,
    AddFoodComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
    // AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

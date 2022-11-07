import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { HomeComponent } from './home/home.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { FullComponent } from './layouts/full/full.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './loader/loader-interceptor.service';
import { SignupComponent } from './signup/signup.component';
import { HandleReqInterceptor } from './services/handle-req.interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HeaderComponent } from './navigation/header/header.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AuthTokenInterceptor } from './services/auth-token.interceptor';
import { RouterGuardService } from './services/router-guard.service';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './cards/cards.component';
import { ConfirmationComponent } from './material-component/dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './material-component/dialog/change-password/change-password.component';
import { CategoryComponent } from './material-component/dialog/category/category.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductComponent } from './product/product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ViewbillproductsComponent } from './viewbillproducts/viewbillproducts.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BestSellerComponent,
    FullComponent,
    AppSidebarComponent,
    SignupComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    SideNavComponent,
    CardsComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    CategoryComponent,
    ManageCategoryComponent,
    ManageProductComponent,
    ProductComponent,
    ManageOrderComponent,
    ViewBillComponent,
    ViewbillproductsComponent,
    ManageUsersComponent
   ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    LayoutModule,
  ],

  providers: [

    {provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:HandleReqInterceptor,multi:true },
    {provide:HTTP_INTERCEPTORS,useClass:AuthTokenInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

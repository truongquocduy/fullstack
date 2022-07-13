import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuestModule } from './guest/guest.module';
import { StoreModule } from '@ngrx/store';
import { cart_store } from './store.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GuestModule,
    AdminModule,
    HttpClientModule,
    StoreModule.forRoot({cart:cart_store}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

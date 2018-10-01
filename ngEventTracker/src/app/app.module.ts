import { FuelTrackerService } from './fuel-tracker.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FuelTrackerComponent } from './fuel-tracker/fuel-tracker.component';

@NgModule({
  declarations: [AppComponent, FuelTrackerComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [FuelTrackerService],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    NavbarComponent
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    InputComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
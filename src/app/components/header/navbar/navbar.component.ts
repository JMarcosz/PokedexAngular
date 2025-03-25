import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  open: boolean = false;
  constructor(private AuthService: AuthService) { }
  DropDown() {
    this.open = !this.open;
    console.log(this.open);
  }

  Logout() {
    this.AuthService.logout();
  }
}
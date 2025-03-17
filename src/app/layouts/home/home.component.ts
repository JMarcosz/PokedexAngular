import { Component } from '@angular/core';
import { HeroComponent } from "../../components/header/hero/hero.component";
import { NavbarComponent } from "../../components/header/navbar/navbar.component";
import { GeneralviewComponent } from "../../components/body/generalview/generalview.component";
import { FooterComponent } from "../../components/footer/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, NavbarComponent, GeneralviewComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

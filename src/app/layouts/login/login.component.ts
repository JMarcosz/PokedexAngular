// LoginComponent Ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../../components/footer/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  imports: [FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      // Aquí se valida el login (usamos el email como username)
      if (this.authService.login(email, password)) {
        // Si el login es exitoso, redirige a la ruta raíz (/)
        console.log("Correcto")
        this.router.navigate(['/']);
      } else {
        console.log("'Credenciales inválidas")
        this.errorMessage = 'Credenciales inválidas';
      }
    }
  }
}


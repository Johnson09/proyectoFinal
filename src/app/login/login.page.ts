import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // Crear formulario reactivo
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Simular lógica de autenticación (reemplazar con lógica real)
      if (email === 'test@example.com' && password === 'password123') {
        localStorage.setItem('user', JSON.stringify({ email }));
        this.navCtrl.navigateRoot('/tabs');
        const toast = await this.toastCtrl.create({
          message: 'Inicio de sesión exitoso',
          duration: 2000,
          color: 'success',
          position: 'bottom',
        });
        await toast.present();
      } else {
        // Mostrar mensaje de error si las credenciales son incorrectas
        const toast = await this.toastCtrl.create({
          message: 'Credenciales incorrectas. Inténtalo de nuevo.',
          duration: 2000,
          color: 'danger',
          position: 'bottom',
        });
        await toast.present();
      }
    }
  }

}

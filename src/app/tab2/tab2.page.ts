import { Component } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  nombre: string = '';
  descripcion: string = '';
  materias: any[] = [];

  constructor(private loadingController: LoadingController, private alertController: AlertController) {
    this.loadMaterias();
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Espere por favor...',
      duration: 2000
    });
    await loading.present();
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Por favor, complete todos los campos.',
      buttons: ['OK']
    });
    await alert.present();
  }

  saveMateria() {
    if (this.nombre.trim() === '' || this.descripcion.trim() === '') {
      this.showAlert();
      return;
    }

    const materia = {
      nombre: this.nombre,
      descripcion: this.descripcion
    };
    
    let materias = JSON.parse(localStorage.getItem('materias') || '[]');
    materias.push(materia);
    localStorage.setItem('materias', JSON.stringify(materias));
    this.showLoading();
    this.loadMaterias();
    this.clearForm();
  }

  loadMaterias() {
    this.materias = JSON.parse(localStorage.getItem('materias') || '[]');
  }

  clearForm() {
    this.nombre = '';
    this.descripcion = '';
  }

  clearMaterias() {
    localStorage.removeItem('materias');
    this.loadMaterias();
  }

  deleteMateria(index: number) {
    let materias = JSON.parse(localStorage.getItem('materias') || '[]');
    materias.splice(index, 1);
    localStorage.setItem('materias', JSON.stringify(materias));
    this.loadMaterias();
  }

}

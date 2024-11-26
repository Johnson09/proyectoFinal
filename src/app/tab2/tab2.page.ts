import { Component } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  coordinacion: string = '';
  descripcion: string = '';
  areas: any[] = [];

  constructor(private loadingController: LoadingController, private alertController: AlertController) {
    this.loadAreas();
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

  saveArea() {
    if (this.coordinacion.trim() === '' || this.descripcion.trim() === '') {
      this.showAlert();
      return;
    }

    const area = {
      coordinacion: this.coordinacion,
      descripcion: this.descripcion
    };
    let areas = JSON.parse(localStorage.getItem('areas') || '[]');
    areas.push(area);
    localStorage.setItem('areas', JSON.stringify(areas));
    this.showLoading();
    this.loadAreas();
    this.clearForm();
  }

  loadAreas() {
    this.areas = JSON.parse(localStorage.getItem('areas') || '[]');
  }

  clearForm() {
    this.coordinacion = '';
    this.descripcion = '';
  }

  clearAreas() {
    localStorage.removeItem('areas');
    this.loadAreas();
  }

  deleteArea(index: number) {
    let areas = JSON.parse(localStorage.getItem('areas') || '[]');
    areas.splice(index, 1);
    localStorage.setItem('areas', JSON.stringify(areas));
    this.loadAreas();
  }

}

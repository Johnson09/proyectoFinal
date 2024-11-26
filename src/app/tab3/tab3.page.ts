import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  records: any[] = [];
  form: any = {
    cedula: '',
    nombre: '',
    apellido: '',
    genero: '',
    telefono: '',
    correo: '',
    fecha_contratacion: '',
  };

  constructor(private loadingController: LoadingController) { }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Espere por favor...',
      duration: 2000
    });
    await loading.present();
  }
  editMode: boolean = false; // Indica si estamos editando un registro


  selectedDate: string = ''; // Almacena la fecha seleccionada
  isDateModalOpen: boolean = false; // Controla si el modal está abierto
 

  saveRecord() {
    if (this.editMode) {
      const index = this.records.findIndex(
        (record) => record.cedula === this.form.cedula
      );
      if (index > -1) {
        this.records[index] = { ...this.form };
        this.editMode = false;
      }
    } else {
      if (this.records.some((record) => record.cedula === this.form.cedula)) {
        alert('La cédula ya existe.');
        return;
      }
      this.records.push({ ...this.form });
    }
    this.resetForm();
  }

  editRecord(record: any) {
    this.form = { ...record };
    this.editMode = true;
  }

  deleteRecord(cedula: string) {
    this.records = this.records.filter((record) => record.cedula !== cedula);
  }

  resetForm() {
    this.form = {
      cedula: '',
      nombre: '',
      apellido: '',
      genero: '',
      telefono: '',
      correo: '',
      fecha_contratacion: '',
    };
    this.editMode = false;
  }

  // Abre el modal de fecha
  openDateModal() {
    this.isDateModalOpen = true;
  }

  // Cierra el modal de fecha
  closeDateModal() {
    this.isDateModalOpen = false;
  }

  // Al seleccionar una fecha
  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
  }

  // Establece la fecha seleccionada y cierra el modal
  setDate() {
    this.form.fecha_contratacion = this.selectedDate;
    this.closeDateModal(); // Cierra el modal
  }
}
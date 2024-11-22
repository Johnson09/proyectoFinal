import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  studentForm!: FormGroup;
  students: any[] = [];
  studentSelect!: any;
  editingIndex: number | null = null;
  isModalOpen = false;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.studentForm = this.fb.group({
      nomestudiante: ['', [Validators.required, Validators.minLength(2)]],
      apeestudiante: ['', [Validators.required, Validators.minLength(2)]],
      fechanac: ['', Validators.required],
      direccion: ['', Validators.required],
      telestudiante: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      corestudiante: ['', [Validators.required, Validators.email]],
      genestudiante: ['', Validators.required],
    });

    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      this.students = JSON.parse(savedStudents);
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.studentForm.reset();
    this.editingIndex = null;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    this.studentForm.reset();
    this.editingIndex = null;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async onSubmit() {
    if (this.studentForm.valid) {
      if (this.editingIndex !== null) {
        this.students[this.editingIndex] = this.studentForm.value;
        this.editingIndex = null;
        await this.showToast('Estudiante actualizado correctamente');
      } else {
        this.students.push(this.studentForm.value);
        await this.showToast('Estudiante agregado correctamente');
      }

      this.updateStorage();
      this.studentForm.reset();
      this.cancel()
    } else {
      console.log('Formulario inválido');
    }
  }

  editStudent(index: number) {
    this.studentForm.patchValue(this.students[index]);
    this.editingIndex = index;
    this.modal.present();
  }

  cargarInfo(index: number) {
    this.studentSelect = this.students[index];
    this.setOpen(true);
  }

  async deleteStudent(index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este estudiante?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            this.students.splice(index, 1);
            this.updateStorage();
            await this.showToast('Estudiante eliminado correctamente');
          },
        },
      ],
    });

    await alert.present();
  }

  private updateStorage() {
    localStorage.setItem('students', JSON.stringify(this.students));
    sessionStorage.setItem('students', JSON.stringify(this.students));
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }

  logout() {
    localStorage.removeItem('user'); // Eliminar datos del usuario
    this.navCtrl.navigateRoot('/login'); // Redirigir al login
  }
}

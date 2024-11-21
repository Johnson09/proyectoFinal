import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  studentForm!: FormGroup;
  students: any[] = [];

  constructor(private fb: FormBuilder) {}

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
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log('Datos del formulario:', this.studentForm.value);
      // Aquí puedes enviar los datos al backend o realizar otras acciones
    } else {
      console.log('Formulario inválido');
    }
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }
}

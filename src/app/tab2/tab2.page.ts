import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private loadingController: LoadingController) { }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Espere por favor...',
      duration: 2000
    });
    await loading.present();
  }

}

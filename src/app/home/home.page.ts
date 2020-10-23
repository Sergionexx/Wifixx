import { Component } from '@angular/core';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage  {

  constructor(private wifiWizard2: WifiWizard2, public toastController: ToastController, public alertController: AlertController) {}

  nameSSID;
  macBSSID;
  listnet;
options = [];
ScanIni=true;


async presentToast() {
  const toast = await this.toastController.create({
    message: 'Escaneando...',
    duration: 4000
  });
  toast.present();
}
  async conexionActual(){

    await this.wifiWizard2.getConnectedSSID().then(res=>{
       console.log(res);
       this.nameSSID = res;
    });
    await this.wifiWizard2.getConnectedBSSID().then(res=>{
      this.macBSSID = res;
    });
    // await this.wifiWizard2.listNetworks().then(res=>{
    //   this.listnet = res;
    // });
   

  }
 
  async scanlista(){
    this.ScanIni = false;
    this.presentToast();
      await this.wifiWizard2.scan().then(res=>{
        this.listnet=res
        this.options=res;
        console.log(this.options)
      }), error => {
        console.log(error);
        this.ScanIni = true;

      };
      ;
}

async presentAlert() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Gracias por usar wifixx',
    message: 'Creado con fines prácticos por Sergio Monteros',
    buttons: ['Cerrar']
  });

  await alert.present();
}

SelectNetwork(){

}
  // async showList(){
  //   this.wifiWizard2.getScanResults(this.listnet).then(res=>{
  //    this.options=res
  //    this.nameSSID = res.ssid
  //   })}


}





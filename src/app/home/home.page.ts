import { Component, OnInit } from '@angular/core';
import { BluetoothService } from '../services/bluetooth.service';
import { DeviceBLC } from '../models/device-dbl';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  deviceSelected!: DeviceBLC;
  deviceList: DeviceBLC[] = [];
  BlueEnable: boolean = false;
  constructor(private bluetoothService: BluetoothService) { }

  async ngOnInit() {
    this.BlueEnable = this.bluetoothService.enabled
  }
  async scan() {
    try {
      await this.bluetoothService.scan().then((resp) => {
        this.deviceList = resp;
        console.log('dispositivos  ', JSON.stringify(resp))
      }).catch((error) => {
        console.log(error, 'error wtehellnou omagaaad')
      });
    } catch (error) {

    }
  }
  async status() {
    this.bluetoothService.isConected().then((resp) => {
      this.BlueEnable = resp;
      console.log(resp);
    });
  }
  async conectImpresora() {
    this.bluetoothService.connect('68:AA:D2:0D:09:AE');
  }
  async conectModulo() {
    this.bluetoothService.connect('00:16:A4:03:FC:89');
  }

  async postData() {
    this.bluetoothService.postDataToImpresora();
  }

  async getData() {
    this.bluetoothService.getData();
  }
}

import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial';
import { DeviceBLC } from '../models/device-dbl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {
  enabled: boolean = false;
  deviceConected !: DeviceBLC;
  deviceList: DeviceBLC[] = []

  constructor() {
    ///miramos si el bluetooth esta activo ; 
    BluetoothSerial.isEnabled().then((active) => {
      this.enabled = active;
      if (active == false) {
        BluetoothSerial.enable().then((active) => {
          this.enabled = active;
        });
      }
    });
  }

  async list(): Promise<DeviceBLC[]> {
    return BluetoothSerial.list();
  }

  async scan(): Promise<DeviceBLC[]> {
    return BluetoothSerial.discoverUnpaired();
  }

  async isConected() {
    return await BluetoothSerial.isEnabled();
  }

  async connect(deviceID: string) {
    BluetoothSerial.connect("68:AA:D2:0D:09:AE").subscribe((resp) => {
      console.log('Respuestas obtengo respuestas : ', resp)
    })
  }

}

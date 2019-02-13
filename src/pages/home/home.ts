import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  message = '';
  triggered = false;
  scheduled = false;

  constructor(private localNotifications: LocalNotifications,private platform: Platform) { }

  ngOnInit() {}

  createNotification() {
    console.log("MENSAJE ",this.message)
    this.platform.ready().then(()=> {
      this.localNotifications.requestPermission().then(
        (permission) => {
          console.log(permission)
          if (permission === true) {
              console.log("ANTES DE CREAR LA NOTIFICACION");
              let notification = this.localNotifications.schedule({
                title: 'Seguimiento ProDiabetes',
                text: '¿Hiciste ejercicio hoy?',
                trigger: {at: new Date(new Date().getTime() + 20000)},
                attachments: ['file://assets/imgs/descarga.jpeg'],
                actions: [
                    { id: 'yes', title: 'Si' },
                    { id: 'no',  title: 'No' }
                ]
                /*id: 1, // Unique id
                title: 'Reminder',
                text: this.message,
                trigger: {at: new Date(new Date().getTime() + 10000)},
                led: '0000FF', // Blue led
                sound: null,
                foreground: true*/
              });
              console.log("DESPUES DE CREAR LA NOTIFICACION");
              this.scheduled = true;
              this.triggered = false;
              console.log("ANTES DE CREAR LA SUSCRIPCION A LA NOTIFICACION");
              this.localNotifications.on('trigger').subscribe(e => {
                this.triggered = true;
                this.scheduled = false;
              });
              console.log("DESPUES DE CREAR LA SUSCRIPCION A LA NOTIFICACION");
            }
          }
        );
      })    
  }

  cancelNotification() {
    this.localNotifications.cancel(1);
    this.scheduled = false;
  }

}

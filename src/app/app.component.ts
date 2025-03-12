import { Component } from '@angular/core';
import { CameraComponent } from './camera/camera.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<app-camera></app-camera>`,
  imports: [CameraComponent] // 👈 IMPORTARLO BIEN
})
export class AppComponent { }

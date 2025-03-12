import { Component } from '@angular/core';
import { CameraService } from './services/camera.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-camera',
  standalone: true, // 👈 IMPORTANTE
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
  providers: [CameraService], // 👈 IMPORTANTE para Standalone
  imports: [NgIf] // 👈 IMPORTAR DIRECTIVAS NECESARIAS
})
export class CameraComponent {
  imageUrl?: string;

  constructor(private cameraService: CameraService) {}

  async takePhoto() {
    const image = await this.cameraService.takePicture();
    if (image) {
      this.imageUrl = image;
    }
  }
}

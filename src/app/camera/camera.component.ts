import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { CameraService } from '../camera/services/camera.service';

@Component({
  selector: 'app-camera',
  standalone: true, // Asegúrate de que sea standalone
  imports: [CommonModule], // Importar CommonModule aquí
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent {
  constructor(private cameraService: CameraService) {}

  // Método para tomar una foto
  async takePhoto() {
    try {
      await this.cameraService.takePicture();
      console.log('Foto tomada correctamente');
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
}
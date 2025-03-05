import { Component } from '@angular/core';
import { CameraService } from './services/camera.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class CameraComponent {
  imageUrl: string | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private cameraService: CameraService) {}

  async takePicture() {
    this.isLoading = true;
    this.errorMessage = null;  // Limpiar cualquier mensaje de error previo

    try {
      const imageUrl = await this.cameraService.takePicture();
      this.imageUrl = imageUrl;
    } catch (error: any) {
      this.errorMessage = error.message || 'Error al tomar la foto';
    } finally {
      this.isLoading = false;
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera/camera.component';
import { GalleryComponent } from './gallery/gallery.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CameraComponent, GalleryComponent], // Importa los componentes standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Mi Aplicación de Cámara y Galería';
}
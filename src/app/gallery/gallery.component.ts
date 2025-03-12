import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { CameraService } from '../camera/services/camera.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule], // Importar CommonModule aquí
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  photos: string[] = []; // Array para almacenar las URLs de las fotos
  private photoSubscription: Subscription = new Subscription(); // Suscripción al Subject

  constructor(private cameraService: CameraService) {}

  async ngOnInit() {
    this.loadPhotos(); // Cargar las fotos al iniciar el componente

    // Suscribirse al Subject para actualizar las fotos automáticamente
    this.photoSubscription = this.cameraService.photoAdded$.subscribe(() => {
      this.loadPhotos();
    });
  }

  ngOnDestroy() {
    // Cancelar la suscripción al destruir el componente
    this.photoSubscription.unsubscribe();
  }

  // Cargar las fotos desde el servicio
  private loadPhotos(): void {
    this.photos = this.cameraService.getPhotos();
    console.log('Fotos cargadas:', this.photos); // Depuración
  }

  // Eliminar una foto
  deletePhoto(index: number): void {
    this.cameraService.deletePhoto(index);
  }
}
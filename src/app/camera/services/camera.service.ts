import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, PermissionStatus } from '@capacitor/camera';
import { Subject } from 'rxjs';
import { Capacitor } from '@capacitor/core';


@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private photoAdded = new Subject<void>(); // Subject para notificar cambios
  photoAdded$ = this.photoAdded.asObservable(); // Observable para suscribirse
  private photos: string[] = []; // Array para almacenar las URLs de las fotos

  constructor() {}

  // Verificar y solicitar permisos
  private async checkPermissions(): Promise<void> {
    // Verificar si la aplicación se está ejecutando en la web
    if (Capacitor.getPlatform() === 'web') {
      console.warn('La cámara no está completamente implementada en la web.');
      return;
    }
  
    const check = async (permission: PermissionStatus): Promise<boolean> => {
      if (permission.camera !== 'granted' || permission.photos !== 'granted') {
        const request = await Camera.requestPermissions();
        return request.camera === 'granted' && request.photos === 'granted';
      }
      return true;
    };
  
    const permissions = await Camera.checkPermissions();
    if (!(await check(permissions))) {
      throw new Error('Permisos de cámara no otorgados');
    }
  }

  // Tomar una foto
  async takePicture(): Promise<void> {
    await this.checkPermissions();

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri, // Obtener la URL de la foto
      source: CameraSource.Camera, // Usar la cámara directamente
    });

    if (image.webPath) {
      this.photos.push(image.webPath); // Almacenar la URL de la foto
      this.photoAdded.next(); // Notificar que se ha agregado una nueva foto
    } else {
      throw new Error('Error al tomar la foto');
    }
  }

  // Obtener todas las fotos
  getPhotos(): string[] {
    return this.photos;
  }

  // Eliminar una foto
  deletePhoto(index: number): void {
    if (index >= 0 && index < this.photos.length) {
      this.photos.splice(index, 1); // Eliminar la foto del array
      this.photoAdded.next(); // Notificar que se ha eliminado una foto
    }
  }
}
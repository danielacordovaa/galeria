import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // 👈 Esto hace que el servicio esté disponible globalmente
})
export class CameraService {
  async takePicture(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const fakeImageUrl = 'https://via.placeholder.com/300'; // Imagen de prueba
        resolve(fakeImageUrl);
      }, 2000);
    });
  }
}

import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
  constructor() {}

  async confirmDelete(): Promise<boolean> {
    const result = await Swal.fire({
      title: 'Aracı Sil',
      text: 'Bu aracı silmek istediğinize emin misiniz?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Sil',
      cancelButtonText: 'İptal',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    });

    return result.isConfirmed;
  }
}

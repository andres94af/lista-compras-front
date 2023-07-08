import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { REST_API_URL } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  apiUrl: string = REST_API_URL + '/cloudinary';

  constructor(private http:HttpClient) { }

  subirImagen(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiUrl, formData);
  }

}

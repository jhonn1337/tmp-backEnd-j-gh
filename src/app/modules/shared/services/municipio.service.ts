import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8090/api/v1";

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private http: HttpClient) { } 

  /**
  * get all Municipio
  */
  getMunicipio(){

    const endpoint = `${base_url}/municipio`;
    return this.http.get(endpoint);  
  }
}

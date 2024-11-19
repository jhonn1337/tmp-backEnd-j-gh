import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8090/api/v1";

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { } 

    /**
    * get all departementos
    */
    getDepartemento(){

      const endpoint = `${base_url}/departamento`;
      return this.http.get(endpoint);  
    }
}

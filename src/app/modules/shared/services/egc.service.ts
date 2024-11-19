import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8090/api/v1";

@Injectable({
  providedIn: 'root'
})
export class EgcService {

  constructor(private http: HttpClient) { } 

    /**
    * get all Empresas Generadoras de carga
    */
    getEgc(){

      const endpoint = `${base_url}/empresaGeneradoraCarga`;
      return this.http.get(endpoint);  
    }

    /**
     * save the Empresas Generadoras de carga
     */
    saveEgc(body: any) {
      const endpoint = `${base_url}/empresaGeneradoraCarga`;
      return this.http.post(endpoint, body);
    }

    /**
     * update Empresas Generadoras de carga
     */
    updateEgc(body: any, id: any){
      const endpoint = `${base_url}/empresaGeneradoraCarga/ ${id}`;
      return this.http.put(endpoint, body);
    }

    /**
     * delete Empresas Generadoras de carga
     */
    deleteEgc(id: any){
      const endpoint = `${base_url}/empresaGeneradoraCarga/ ${id}`;
      return this.http.delete(endpoint);
    }

    /**
     * get id Empresas Generadoras de carga
     */
    getEgcById(id: any){
      const endpoint = `${base_url}/empresaGeneradoraCarga/ ${id}`;
      return this.http.get(endpoint);
    }    
}

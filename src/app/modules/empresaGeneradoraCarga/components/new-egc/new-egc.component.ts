import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EgcService } from '../../../shared/services/egc.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartamentoService } from '../../../shared/services/departamento.service';
import { MunicipioService } from '../../../shared/services/municipio.service';

@Component({
  selector: 'app-new-egc',
  templateUrl: './new-egc.component.html',
  styleUrl: './new-egc.component.css'
})
export class NewEgcComponent implements OnInit{

  public egcForm!: FormGroup;
  private fb = inject(FormBuilder);
  private egcService= inject(EgcService);
  private depaService= inject(DepartamentoService);
  private muniService= inject(MunicipioService);
  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  estadoFormulario: string = "";

  departamentoSedePrincipal: Departamento[]=[];
  municipio: Municipio[]=[];

  ngOnInit(): void {

    console.log(this.data);

    this.getDepartamentos();
    this.getMunicipios();
    this.estadoFormulario = "Agregar";
    
    this.egcForm = this.fb.group({
      nit: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correoElectronico: ['', Validators.required],
      nombreContacto: ['', Validators.required],
      observacionContacto: ['', Validators.required],
      descripcion: ['', Validators.required],
      departamentoSedePrincipal: ['', Validators.required],
      municipio: ['', Validators.required]            
    })

    if (this.data != null ){
      this.updateForm(this.data);
      this.estadoFormulario = "Actualizar";
    }
  }

  onSave(){

    let data = {
      nit: this.egcForm.get('nit')?.value,
      nombre: this.egcForm.get('nombre')?.value,
      direccion: this.egcForm.get('direccion')?.value,

      telefono: this.egcForm.get('telefono')?.value,
      correoElectronico: this.egcForm.get('correoElectronico')?.value,
      nombreContacto: this.egcForm.get('nombreContacto')?.value,
      observacionContacto: this.egcForm.get('observacionContacto')?.value,
      descripcion: this.egcForm.get('descripcion')?.value,
      departamentoSedePrincipal: this.egcForm.get('departamentoSedePrincipal')?.value,
      municipio: this.egcForm.get('municipio')?.value      
      
    }

    if (this.data != null ){
      //update registry
      data.departamentoSedePrincipal = {id: data.departamentoSedePrincipal};
      data.municipio = {id: data.municipio};

      this.egcService.updateEgc(data, this.data.id)
          .subscribe({
            next: (data) => {
                      this.dialogRef.close(1);
            },
            error: (e) => this.dialogRef.close(2) 
          })   
    } else {
      //create new registry
      data.departamentoSedePrincipal = {id: data.departamentoSedePrincipal};
      data.municipio = {id: data.municipio};
      
      this.egcService.saveEgc(data)
          .subscribe({
            next: (data) => {
                      this.dialogRef.close(1);
            },
            error: (e) => this.dialogRef.close(2) 
          })
    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data: any){
    this.egcForm = this.fb.group( {
      nit: [data.nit, Validators.required],
      nombre: [data.nombre, Validators.required],
      direccion: [data.direccion, Validators.required],

      //telefono: [data.telefono, [Validators.required, Validators.pattern(new RegExp("(?=.*[0-9])"))]],
      telefono: [data.telefono, Validators.required],
      correoElectronico: [data.correoElectronico, Validators.required],
      nombreContacto: [data.nombreContacto, Validators.required],
      observacionContacto: [data.observacionContacto, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      departamentoSedePrincipal: [
        data.departamentoSedePrincipal!=null?data.departamentoSedePrincipal.id:null, 
        Validators.required],
      municipio: [data.municipio!= null? data.municipio.id:null, Validators.required],     
      
    });

  }

  getDepartamentos(){
    this.depaService.getDepartemento()
        .subscribe({
          next: (resp: any) => {
            this.departamentoSedePrincipal = resp.data
          },
          error: (e) => console.log("error al consultar Departamentos") 
        })

  }

  getMunicipios(){
    this.muniService.getMunicipio()
      .subscribe({
        next: (resp: any) => {
          this.municipio = resp.data
        },
        error: (e) => console.log("error al consultar Municipios") 
      })
  }

  
}

export interface Departamento{
  id: number;
  codigo: number;
  nombre: string;
}

export interface Municipio{
  id: number;
  codigo: number;
  nombre: string;
}





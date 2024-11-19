import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { EgcService } from '../../../shared/services/egc.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { NewEgcComponent } from '../new-egc/new-egc.component';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';


@Component({
  selector: 'app-egc',
  templateUrl: './egc.component.html',
  styleUrl: './egc.component.css'
})
export class EgcComponent implements OnInit{

  private egcService = inject(EgcService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getEgc();
  }

  displayedColumns: string[] = [ 'id' ,'nit	', 'nombre', 
       /*'direccion',	 'telefono',	 'correoElectronico',
	     'nombreContacto',	 'descripcion', */'actions'];
  dataSource = new MatTableDataSource<EgcElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getEgc(): void {

    this.egcService.getEgc()
      .subscribe( (data:any) => {

        console.log("respuesta Empresa Generadora de Carga: ", data);
        this.processEgcResponse(data);

      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  processEgcResponse(resp: any){

    const dataEgc: EgcElement[] = [];

    if(resp.status == "201"){

      let lista =  resp.data;

      lista.forEach((element: EgcElement) => {
        dataEgc.push(element);
      });

      this.dataSource = new MatTableDataSource<EgcElement>(dataEgc);
      this.dataSource.paginator = this.paginator;

    }
  }

  processEgcResponseId(resp: any){

    const dataEgc: EgcElement[] = [];

    if(resp.status == "201"){

      let lista =  resp.data;

      //lista.forEach((element: EgcElement) => {
        dataEgc.push(resp.data);
      //});

      this.dataSource = new MatTableDataSource<EgcElement>(dataEgc);
      this.dataSource.paginator = this.paginator;

    }
  }

  openEgcDialog(){
    const dialogRef = this.dialog.open(NewEgcComponent , {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => { 
      
      if( result == 1){
        this.openSnackBar("Empresa Remitente de la carga", "Exitosa");
        this.getEgc();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar Empresa Remitente de la carga", "Error");
      }
    });
  }
  
  edit(id:number, nit: string, nombre: string, direccion: string,
       telefono:number, correoElectronico: string, 
       nombreContacto: string, observacionContacto:string,
       descripcion: string, departamentoSedePrincipal:any, municipio:any
  ){
    const dialogRef = this.dialog.open(NewEgcComponent , {
      width: '450px',
      data: {nit: nit, id: id,  nombre: nombre, direccion: direccion,
             telefono:telefono, correoElectronico:correoElectronico, 
             nombreContacto:nombreContacto, observacionContacto:observacionContacto,
             descripcion:descripcion, departamentoSedePrincipal:departamentoSedePrincipal,
             municipio:municipio
      }
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Empresa Remitente de la carga", "Exitosa");
        this.getEgc();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al actualizar Empresa Remitente de la carga", "Error");
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      data: {id: id, module: "egc"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Empresa Remitente de la carga Eliminada", "Exitosa");
        this.getEgc();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar Empresa Remitente de la carga", "Error");
      }
    });
  }

  buscar( termino: string){

    if( termino.length === 0){
      return this.getEgc();
    }

    this.egcService.getEgcById(termino)
            .subscribe( (resp: any) => {
              this.processEgcResponseId(resp);
            })
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })

  }

}

export interface EgcElement {
  id: number;  
  nit: string;
  nombre: string;
  direccion: string;
  telefono:number;	 
  correoElectronico: string;
	nombreContacto: string;	
  observacionContacto:string;
  descripcion: string;
  departamentoSedePrincipal: any;
  municipio: any;
}

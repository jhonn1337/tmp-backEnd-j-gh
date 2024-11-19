import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { EgcService } from '../../services/egc.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {

  private categoryService= inject(CategoryService);
  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  private egcService= inject(EgcService);


  onNoClick(){
    this.dialogRef.close(3)
  }

  delete(){
    if (this.data != null){

      if (this.data.module == "category") {

        this.categoryService.deleteCategorie(this.data.id)
              .subscribe({
                next: (data) => { this.dialogRef.close(1);},
                error: (e) => this.dialogRef.close(2) 
              })      
      } else if ( this.data.module == "egc" )  {

            this.egcService.deleteEgc(this.data.id)
              .subscribe({
                next: (data) => {this.dialogRef.close(1);},
                error: (e) => this.dialogRef.close(2) 
              })
      } 

    } else {
      this.dialogRef.close(2);
    }
  }

}

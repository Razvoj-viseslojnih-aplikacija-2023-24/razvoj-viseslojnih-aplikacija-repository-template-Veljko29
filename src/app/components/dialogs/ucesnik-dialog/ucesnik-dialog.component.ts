import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ucesnik } from 'src/app/models/ucesnik';
import { UcesnikService } from 'src/app/services/ucesnik.service';
@Component({
  selector: 'app-ucesnik-dialog',
  templateUrl: './ucesnik-dialog.component.html',
  styleUrls: ['./ucesnik-dialog.component.css']
})
export class UcesnikDialogComponent {

  flag!:number;

  constructor(
    public snackBar:MatSnackBar,
    public dialogRef:MatDialogRef<Ucesnik>,
    @Inject (MAT_DIALOG_DATA) public data: Ucesnik,
    public service:UcesnikService
  ){}

  public add(){
    this.service.addUcesnik(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Uspesno dodat ucesnik sa maticnim brojem: ${data.mbr}`, `U redu`, {duration:2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspesno dodavanje`, `Zatvori`, {duration:1500});
    }
  }

  public update(){
    this.service.updateUcesnik(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Uspesno azuriran ucesnik sa mbr: ${data.mbr}`, `U redu`, {duration:2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspesno azuriranje`, `Zatvori`, {duration:1500});
    }
  }

  public delete(){
    this.service.deleteUcesnik(this.data.id).subscribe(
      (data) => {
        this.snackBar.open(`${data}`, `U redu`, {duration:2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspesno brisanje`, `Zatvori`, {duration:1500});
    }
  }

  public cancel(){
    this.dialogRef.close();
    this.snackBar.open(`Odustali ste od izmena`, `Zatvori`, {duration:1500});
  }

}

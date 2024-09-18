import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Predmet } from 'src/app/models/predmet';
import { Rociste } from 'src/app/models/rociste';
import { Ucesnik } from 'src/app/models/ucesnik';
import { RocisteService } from 'src/app/services/rociste.service';
import { UcesnikService } from 'src/app/services/ucesnik.service';
import { PredmetService } from 'src/app/services/predmet.service';

@Component({
  selector: 'app-rociste-dialog',
  templateUrl: './rociste-dialog.component.html',
  styleUrls: ['./rociste-dialog.component.css']
})
export class RocisteDialogComponent {
  flag!: number;

   ucesnik!: Ucesnik[];
   predmet!: Predmet[];
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Rociste>,
    @Inject (MAT_DIALOG_DATA) public data: Rociste,
    public service: RocisteService,
    public PredmetService: PredmetService,
    public UcesnikService: UcesnikService
  ){}
  public compare(a:any, b:any){
    return a.id == b.id;
  }
  public add(){
    this.service.addRociste(this.data).subscribe(
      () => {
        this.snackBar.open(`Uspesno dodato rociste sa sudnicom: ${this.data.sudnica}`,
                            `U redu`, {duration:2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspesno dodavanje`, `Zatvori`, {duration:1000});
    }
  }

  public update(){
    this.service.updateRociste(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Uspesno azurirano rociste sa sudnicom: ${this.data.sudnica}`,
                            `U redu`, {duration:2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspesno azuriranje`, `Zatvori`, {duration:1000});
    }
  }

  public delete(){
    this.service.deleteRociste(this.data.id).subscribe(
      (data) => {
        this.snackBar.open(`${data}`,
                            `U redu`, {duration:2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspesno brisanje`, `Zatvori`, {duration:1000});
    }
  }

  public cancel(){
    this.dialogRef.close();
    this.snackBar.open(`Odustali ste od izmena`, `Zatvori`, {duration:2500});
  }
}

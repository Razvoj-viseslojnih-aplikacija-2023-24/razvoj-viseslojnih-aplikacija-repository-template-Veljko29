import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Predmet } from 'src/app/models/predmet';
import { Rociste } from 'src/app/models/rociste';
import { Ucesnik } from 'src/app/models/ucesnik';

import { PredmetService } from 'src/app/services/predmet.service';
import { RocisteService } from 'src/app/services/rociste.service';
import { UcesnikService } from 'src/app/services/ucesnik.service';
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
    public UcesnikService: UcesnikService,
    public PredmetService: PredmetService
  ){}
  ngOnInit(): void {
    this.loadUcesnici();
    this.loadPredmeti();
    console.log('Podaci u dijalogu:', this.data);
  }

  public loadUcesnici(): void {
    this.UcesnikService.getAllUcesniks().subscribe(
      (data: Ucesnik[]) => {
        this.ucesnik = data;
        console.log('Učesnici:', this.ucesnik);
      },
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  public loadPredmeti(): void {
    this.PredmetService.getAllPredmets().subscribe(
      (data: Predmet[]) => {
        this.predmet = data;
        console.log('Predmeti:', this.predmet);
      },
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  public compare(a:any, b:any){
    return a && b && a.id === b.id;
  }
  public add(){
    console.log('Pozvana metoda add()');
    this.service.addRociste(this.data).subscribe(
      () => {
        this.snackBar.open(`Uspesno dodat predmet sa sudnicom: ${this.data.sudnica}`,
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

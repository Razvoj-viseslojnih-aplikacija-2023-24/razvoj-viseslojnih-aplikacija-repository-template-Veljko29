import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Predmet } from 'src/app/models/predmet';
import { Sud } from 'src/app/models/sud';
import { PredmetService } from 'src/app/services/predmet.service';
import { SudService } from 'src/app/services/sud.service';
@Component({
  selector: 'app-predmet-dialog',
  templateUrl: './predmet-dialog.component.html',
  styleUrls: ['./predmet-dialog.component.css']
})
export class PredmetDialogComponent {
  flag!: number;

   sud!: Sud[];

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Predmet>,
    @Inject (MAT_DIALOG_DATA) public data: Predmet,
    public service: PredmetService,
    public SudService: SudService
  ){}
  ngOnInit(): void {
    this.data.aktivan = this.data.aktivan !== undefined ? this.data.aktivan : false;
    this.loadSudovi();
  }
  public toggleAktivan(isChecked: boolean): void {
    this.data.aktivan = isChecked; // Postavi aktivan status na vrednost koju je korisnik izabrao
    console.log('Aktivan status:', this.data.aktivan); // Proveri novi status
}

  public loadSudovi(): void {
    this.SudService.getAllSuds().subscribe(
      (data: Sud[]) => {
        this.sud = data;
      },
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  public compare(a:any, b:any){
    return a.id == b.id;
  }
  public add(){
    console.log('Pozvana metoda add()'); // Dodaj ovu liniju za proveru
    this.service.addPredmet(this.data).subscribe(
      () => {
        this.snackBar.open(`Uspesno dodat predmet sa brojem: ${this.data.brojPr}`,
                            `U redu`, {duration:2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspesno dodavanje`, `Zatvori`, {duration:1000});
    }
  }

  public update(){
    this.service.updatePredmet(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Uspesno azuriran predmet sa brojem: ${this.data.brojPr}`,
                            `U redu`, {duration:2500});
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open(`Neuspesno azuriranje`, `Zatvori`, {duration:1000});
    }
  }

  public delete(){
    this.service.deletePredmet(this.data.id).subscribe(
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

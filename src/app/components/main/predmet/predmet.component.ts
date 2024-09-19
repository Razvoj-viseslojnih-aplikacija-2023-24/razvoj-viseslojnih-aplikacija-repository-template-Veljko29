import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Predmet } from 'src/app/models/predmet';
import { PredmetService } from 'src/app/services/predmet.service';
import { PredmetDialogComponent } from '../../dialogs/predmet-dialog/predmet-dialog.component';
import { Sud } from 'src/app/models/sud';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-predmet',
  templateUrl: './predmet.component.html',
  styleUrls: ['./predmet.component.css']
})
export class PredmetComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'brojPr', 'opis', 'datum_pocetka', 'aktivan', 'sud', 'actions'];
  dataSource!: MatTableDataSource<Predmet>;
  subscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: PredmetService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public loadData(): void {
    this.subscription = this.service.getAllPredmets().subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  public openDialog(flag: number, id?: number, brojPr?: string, opis?: string, datum_pocetka?: Date, aktivan?: Boolean, sud?: Sud): void {
    const dialogRef = this.dialog.open(PredmetDialogComponent, { data: { id, brojPr, opis, datum_pocetka, aktivan, sud } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result === 1) {
          this.loadData();
        }
      }
    );
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}

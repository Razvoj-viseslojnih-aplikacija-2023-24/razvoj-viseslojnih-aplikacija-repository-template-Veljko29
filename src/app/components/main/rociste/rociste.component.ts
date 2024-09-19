import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Rociste } from 'src/app/models/rociste';
import { RocisteService } from 'src/app/services/rociste.service';
import { RocisteDialogComponent } from '../../dialogs/rociste-dialog/rociste-dialog.component';
import { Ucesnik } from 'src/app/models/ucesnik';
import { Predmet } from 'src/app/models/predmet';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-rociste',
  templateUrl: './rociste.component.html',
  styleUrls: ['./rociste.component.css']
})
export class RocisteComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'datum_rocista', 'sudnica', 'ucesnik', 'predmet', 'actions'];
  dataSource!: MatTableDataSource<Rociste>;
  subscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: RocisteService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public loadData(): void {
    this.subscription = this.service.getAllRocistes().subscribe(
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

  public openDialog(flag: number, id?: number, datum_rocista?: Date, sudnica?: string, ucesnik?: Ucesnik, predmet?: Predmet): void {
    const dialogRef = this.dialog.open(RocisteDialogComponent, { data: { id, datum_rocista, sudnica, ucesnik, predmet } });
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

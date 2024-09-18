import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Ucesnik } from 'src/app/models/ucesnik';
import { UcesnikService } from 'src/app/services/ucesnik.service';
import { UcesnikDialogComponent } from '../../dialogs/ucesnik-dialog/ucesnik-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-ucesnik',
  templateUrl: './ucesnik.component.html',
  styleUrls: ['./ucesnik.component.css']
})
export class UcesnikComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'ime', 'prezime', 'mbr', 'status', 'actions'];
  dataSource!: MatTableDataSource<Ucesnik>;
  subscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort; // ViewChild for sorting
  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild for pagination

  constructor(private service: UcesnikService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData(): void {
    this.subscription = this.service.getAllUcesniks().subscribe(
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

  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, mbr?: string, status?: string): void {
    const dialogRef = this.dialog.open(UcesnikDialogComponent, {
      data: { id, ime, prezime, mbr, status }
    });

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

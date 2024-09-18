import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Sud } from 'src/app/models/sud';
import { SudService } from 'src/app/services/sud.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SudDialogComponent } from '../../dialogs/sud-dialog/sud-dialog.component';

@Component({
  selector: 'app-sud',
  templateUrl: './sud.component.html',
  styleUrls: ['./sud.component.css']
})
export class SudComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'naziv', 'adresa', 'actions']; // Dodaj 'actions' kolonu
  dataSource!: MatTableDataSource<Sud>;
  subscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort; // Dodaj ViewChild za sortiranje
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Dodaj ViewChild za paginaciju

  constructor(private service: SudService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData() {
    this.subscription = this.service.getAllSuds().subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort; // Aktiviraj sortiranje
        this.dataSource.paginator = this.paginator; // Aktiviraj paginaciju
      },
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  public openDialog(flag: number, id?: number, naziv?: string, adresa?: string) {
    const dialogRef = this.dialog.open(SudDialogComponent, {
      data: { id, naziv, adresa }
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.loadData(); // Osveži podatke nakon zatvaranja dijaloga
      }
    });
  }

  public applyFilter(filter: any) {
    filter = filter.target.value.trim().toLowerCase();
    this.dataSource.filter = filter;
  }
}

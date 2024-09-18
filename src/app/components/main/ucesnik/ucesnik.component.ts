import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Ucesnik } from 'src/app/models/ucesnik';
import { UcesnikService } from 'src/app/services/ucesnik.service';
import { __decorate } from "tslib";
import { UcesnikDialogComponent } from '../../dialogs/ucesnik-dialog/ucesnik-dialog.component';

@Component({
  selector: 'app-ucesnik',
  templateUrl: './ucesnik.component.html',
  styleUrls: ['./ucesnik.component.css']
})
export class UcesnikComponent implements OnInit, OnDestroy {
    displayedColumns = ['id', 'ime', 'prezime', 'mbr', 'status'];
    dataSource!:MatTableDataSource<Ucesnik>;
    subscription!:Subscription;

    constructor(private service:UcesnikService, public dialog:MatDialog){}

     ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    ngOnInit(): void {
      this.loadData();
    }

    public loadData(){
      this.subscription = this.service.getAllUcesniks().subscribe(
        (data) => {
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          //this.dataSource.sort = this.sort;
          //this.dataSource.paginator = this.paginator;
        }
      ),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
    }
    public openDialog(flag:number, id?:number, ime?:string, prezime?:string, mbr?:string,status?:string){
      const dialogRef = this.dialog.open(UcesnikDialogComponent, {data:{id,ime,prezime, mbr, status}});
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed().subscribe(
        (result) => {
          if(result == 1){
            this.loadData();
          }
        }
      )
    }

    public applyFilter(filter:any){
      filter = filter.target.value;
      filter = filter.trim();
      filter = filter.toLocaleLowerCase();
      this.dataSource.filter = filter;
    }


}

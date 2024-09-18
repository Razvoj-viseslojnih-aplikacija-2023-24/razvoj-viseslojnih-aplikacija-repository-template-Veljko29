import { Component, OnDestroy, OnInit } from '@angular/core';
import { PredmetService } from 'src/app/services/predmet.service';
import { __decorate } from "tslib";
import { PredmetDialogComponent } from '../../dialogs/predmet-dialog/predmet-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Sud } from 'src/app/models/sud';

@Component({
  selector: 'app-predmet',
  templateUrl: './predmet.component.html',
  styleUrls: ['./predmet.component.css']
})
export class PredmetComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'brojPr', 'opis', 'datum_pocetka','aktivan', 'sud'];
  dataSource!:MatTableDataSource<Sud>;
  subscription!:Subscription;
  sort: any;
  paginator: any;

  constructor(private service:PredmetService, public dialog:MatDialog){}

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.subscription = this.service.getAllPredmets().subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }
  public openDialog(flag:number, id?:number, brojPr?:string, opis?:string, datum_pocetka?:Date, aktivan?:Boolean, sud?:Sud){
    const dialogRef = this.dialog.open(PredmetDialogComponent, {data:{id,brojPr,opis,datum_pocetka,aktivan,sud}});
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

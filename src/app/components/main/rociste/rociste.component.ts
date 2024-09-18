import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Sud } from 'src/app/models/sud';
import { RocisteService } from 'src/app/services/rociste.service';
import { Ucesnik } from 'src/app/models/ucesnik';
import { RocisteDialogComponent } from '../../dialogs/rociste-dialog/rociste-dialog.component';
import { Predmet } from 'src/app/models/predmet';

@Component({
  selector: 'app-rociste',
  templateUrl: './rociste.component.html',
  styleUrls: ['./rociste.component.css']
})
export class RocisteComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'datum_rocista', 'sudnica', 'ucesnik','predmet'];
  dataSource!:MatTableDataSource<Sud>;
  subscription!:Subscription;
  sort: any;
  paginator: any;

  constructor(private service:RocisteService, public dialog:MatDialog){}

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.subscription = this.service.getAllRocistes().subscribe(
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
  public openDialog(flag:number, id?:number, datum_rocista?:Date, sudnica?:string, ucesnik?:Ucesnik, predmet?:Predmet){
    const dialogRef = this.dialog.open(RocisteDialogComponent, {data:{id, datum_rocista, sudnica, ucesnik, predmet }});
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

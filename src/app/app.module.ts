import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {HttpClientModule} from '@angular/common/http';
import { SudComponent } from './components/main/sud/sud.component';
import { UcesnikComponent } from './components/main/ucesnik/ucesnik.component';
import { PredmetComponent } from './components/main/predmet/predmet.component';
import { RocisteComponent } from './components/main/rociste/rociste.component';
import { AuthorComponent } from './components/utility/author/author.component';
import { AboutComponent } from './components/utility/about/about.component';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './components/utility/home/home.component';
import { SudDialogDirective } from './components/sud-dialog.directive';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
//import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { SudDialogComponent } from './components/dialogs/sud-dialog/sud-dialog.component'
import { UcesnikDialogComponent } from './components/dialogs/ucesnik-dialog/ucesnik-dialog.component';
import { PredmetDialogComponent } from './components/dialogs/predmet-dialog/predmet-dialog.component';
import { RocisteDialogComponent } from './components/dialogs/rociste-dialog/rociste-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    SudComponent,
    UcesnikComponent,
    PredmetComponent,
    RocisteComponent,
    AuthorComponent,
    AboutComponent,
    HomeComponent,
    SudDialogDirective,
    //DialogExampleComponent,
    SudDialogComponent,
    UcesnikDialogComponent,
    PredmetDialogComponent,
    RocisteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatGridListModule,
    MatExpansionModule,
    HttpClientModule,
    MatTableModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SudComponent } from './components/main/sud/sud.component';
import { UcesnikComponent } from './components/main/ucesnik/ucesnik.component';
import { PredmetComponent } from './components/main/predmet/predmet.component';
import { RocisteComponent } from './components/main/rociste/rociste.component';
import { HomeComponent } from './components/utility/home/home.component';
import { AboutComponent } from './components/utility/about/about.component';
import { AuthorComponent } from './components/utility/author/author.component';

const routes: Routes = [

  {path: 'sud', component: SudComponent},
  {path: 'ucesnik', component: UcesnikComponent},
  {path: 'predmet', component: PredmetComponent},
  {path: 'rociste', component: RocisteComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'author', component: AuthorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

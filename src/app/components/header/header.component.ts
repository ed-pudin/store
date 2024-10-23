import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
     <a [routerLink]="['/']">My store</a>
    <!--Un componente siempre pertenece a un modulo-->
    <span class="spacer"></span><app-cart class="mouseHover" (click)="goToCheckOut()"></app-cart>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router){}

  goToCheckOut(){
    this.router.navigate(['/checkout'])
  }
}

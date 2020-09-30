import { Component,NgZone, OnInit } from '@angular/core';
import{ Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularProject';
  ngZone : NgZone;
  router: Router;
  
  constructor(ngZone : NgZone,router: Router) {
    this.ngZone = ngZone;
    this.router = router;
   }

  ngOnInit(): void {
    this.ngZone.run(()=>this.router.navigateByUrl('/loginPage')); 
  }
}
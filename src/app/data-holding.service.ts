import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataHoldingService {

  constructor(
    private router:Router,
  ) { }
  
  private data;

  setdata
  setData(data){
    this.data = data;
  }

  getData(){
    return this.data;
  }

  clearData(){
    this.data = undefined;
  }
}
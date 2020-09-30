import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs/internal/observable';
import { SocietyMemberInfoModel } from './society-member-info-model'


@Injectable({
  providedIn: 'root'
})
export class MemberInfoService {
  http: HttpClient;
  url: string = 'http://localhost:53320/api/ESociety';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(http: HttpClient) {
    this.http = http;
  }
  GetAllMembers(): Observable<SocietyMemberInfoModel[]> {
    return this.http.get<SocietyMemberInfoModel[]>(this.url);
  }
  GetByAccType(AccType: string): Observable<SocietyMemberInfoModel[]> {
    return this.http.get<SocietyMemberInfoModel[]>(this.url + '/GetBy/' + AccType);
  }
  InsertMember(MiModel: SocietyMemberInfoModel): Observable<string> {
    return this.http.post<string>(this.url, MiModel, this.httpOptions);
  }
  GetMemberByID(SMID: number): Observable<SocietyMemberInfoModel> {
    return this.http.get<SocietyMemberInfoModel>(this.url + '/' + SMID);
  }
  UpdateInfo(SMID: number, Model: SocietyMemberInfoModel): Observable<string> {
    return this.http.put<string>(this.url + '/UpdateInfo/' + SMID, Model, this.httpOptions);
  }
  DeleteMember(SMID: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url + '/Delete/' + SMID);
  }
  // Data Validation Method
  public Validate(MiModel: SocietyMemberInfoModel){
    let FullName_exp = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
    let Mob_exp = /^[0-9]{10}$/;
    let regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    
    if(MiModel.Name == "")
    return "Name can not be empty."

    if(!FullName_exp.test(MiModel.Name))
    return "Full name not provided or invalid name."

    if(!Mob_exp.test(MiModel.ContactNumber.toString()))
    return "Mobile number invalid."

    if(!regexpEmail.test(MiModel.Email))
    return "Email ID is invalid."

    if(MiModel.Address == "")
    return "Address can not be empty."

    if(MiModel.AccountType == "")
    return "Please select 'Account Type'."

    if(MiModel.AccountType == "SocietyMember" && MiModel.HouseNo == "")
    return "House number can not be empty for society member."

    if(MiModel.AccountType == "ServiceProvider" && MiModel.BusinessName == "")
    return "Business name can not be empty for service provider."

    if(MiModel.Rent.toString() == "")
    return "Rent can not be empty"

    return "Valid"
  }

  public ValidatePassword(Password: string){
    let regexpNumber: RegExp = /^.{6,}$/;
    if(regexpNumber.test(Password))
    return "Valid";
    else
    return "Password Invalid ! should be of minimum 6 character";
  }
}

import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, FormControl} from '@angular/forms';
import{ Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { SocietyMemberInfoModel } from '../society-member-info-model'
import { MemberInfoService } from '../member-info.service';
import { animation } from '@angular/animations';
import { DataHoldingService } from '../data-holding.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Alert: boolean = false;
  Alert1: boolean = false;
  AlertMessage: string = null;
  svc: MemberInfoService;
  NewPassword: string = null;
  ngZone : NgZone;
  router: Router;

  constructor(private DataHoldingService: DataHoldingService,svc: MemberInfoService,ngZone : NgZone,router: Router) { 
    this.ngZone = ngZone;
    this.router = router;
    this.svc = svc;
  }
  MiModel  = new SocietyMemberInfoModel();
  Model1 = new SocietyMemberInfoModel();
  SMID: number;
    ProfilePage = new FormGroup({
    NewPassword: new FormControl('')
  });
  ngOnInit(): void {
    this.MiModel = this.DataHoldingService.getData();
  }
  RedirectToUserPage(): void{
    if(this.MiModel.AccountType == "Admin")
    this.ngZone.run(()=>this.router.navigateByUrl('/AdminPage'));
    else if(this.MiModel.AccountType == "SocietyMember")
    this.ngZone.run(()=>this.router.navigateByUrl('/SocietyMemberPage'));
    if(this.MiModel.AccountType == "ServiceProvider")
    this.ngZone.run(()=>this.router.navigateByUrl('/ServiceProviderPage'));
  }
  UpdateProfile(): void{
    
  }
  UpdatePassword(): void{
    this.SMID = this.MiModel.SMID;
    this.AlertMessage = this.svc.ValidatePassword(this.ProfilePage.controls.NewPassword.value);
    if(this.AlertMessage!="Valid")
      this.Alert = true;
    else
     {
       this.Model1.Password = this.ProfilePage.controls.NewPassword.value;
       this.svc.UpdateInfo(this.SMID,this.Model1).subscribe(data => {
       this.AlertMessage = data;
       this.Alert1 = true;
       });
     }
  }
  CloseAlert(): void {
    this.Alert = false;
    this.Alert1 = false;
    this.AlertMessage = null;
  }
}

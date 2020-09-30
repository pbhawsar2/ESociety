import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, FormControl } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { SocietyMemberInfoModel } from '../society-member-info-model';
import { MemberInfoService } from '../member-info.service';
import { animate } from '@angular/animations';
import { fade } from '../animation';
import { DataHoldingService } from '../data-holding.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [fade]
})
export class LoginPageComponent implements OnInit {
  alert: boolean = false;
  ErrorMessage: string = null;
  MiModel = new SocietyMemberInfoModel();
  svc: MemberInfoService;

  loginPage = new FormGroup({
    SMID: new FormControl(''),
    Password: new FormControl(''),
  });
  ngZone: NgZone;
  router: Router;
  SMID: number;

  constructor(svc: MemberInfoService,private DataHoldingService : DataHoldingService, ngZone: NgZone, router: Router) {
    this.ngZone = ngZone;
    this.router = router;
    this.svc = svc;
  }

  ngOnInit(): void {
  }

  login(): void {

    this.SMID = this.loginPage.controls.SMID.value;
    this.svc.GetMemberByID(this.SMID).subscribe((data: SocietyMemberInfoModel) => {
      this.MiModel = data;
      if (this.MiModel != null) {
      if (data.Password == this.loginPage.controls.Password.value)
      {
        this.DataHoldingService.setData(this.MiModel);
        if(this.MiModel.AccountType == "Admin")
          this.ngZone.run(() => this.router.navigateByUrl('/AdminPage'));
        else if(this.MiModel.AccountType == "SocietyMember")
          this.ngZone.run(() => this.router.navigateByUrl('/SocietyMemberPage'));
        else
          this.ngZone.run(() => this.router.navigateByUrl('/ServiceProviderPage'));
      }
      else {
       this.ErrorMessage = " Password is invalid.";
        this.alert = true;
      }
    }
    else
    {
      this.ErrorMessage = " Society member ID (SMID) invalid.";
        this.alert = true;
    }
    });
  }
  CloseAlert(): void {
    this.alert = false;
  }
}

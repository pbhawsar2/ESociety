import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, FormControl } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { SocietyMemberInfoModel } from '../society-member-info-model';
import { MessageModel } from '../message-model';
import { MemberInfoService } from '../member-info.service';
import { MessageService } from '../message.service';
import { animation } from '@angular/animations';
import { fade } from '../animation';
import { DataHoldingService } from '../data-holding.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-admin-user-page',
  templateUrl: './admin-user-page.component.html',
  styleUrls: ['./admin-user-page.component.css'],
  animations: [fade],
})
export class AdminUserPageComponent implements OnInit {
  MiModel = new SocietyMemberInfoModel();
  InModel = new SocietyMemberInfoModel();
  Msgm = new MessageModel();
  result: SocietyMemberInfoModel[];
  SentMessageList: MessageModel[];
  MsgFromServicePList: MessageModel[];
  svc: MemberInfoService;
  msgs: MessageService;
  AlertMessageTitle: string = null;
  AlertMessage: string = null;
  Alert: boolean = false;
  Alert2: boolean = false;
  Alert3: boolean = false;
  RemoveUpdateBtn: boolean = false;
  count: number = 0;
  count1: number = 0;
  SMID: number;
  bgColor = 'primary';

  AdminPage = new FormGroup({
    SMID: new FormControl(''),
    Name: new FormControl(''),
    Address: new FormControl(''),
    Email: new FormControl(''),
    ContactNumber: new FormControl(''),
    AccountType: new FormControl(''),
    HouseNo: new FormControl(''),
    BusinessName: new FormControl(''),
    Rent: new FormControl(''),
    MessageTitle: new FormControl(''),
    Message: new FormControl(''),
    // for updating
    SMID1: new FormControl(''),
    Name1: new FormControl(''),
    Address1: new FormControl(''),
    Email1: new FormControl(''),
    ContactNumber1: new FormControl(''),
    AccountType1: new FormControl(''),
    HouseNo1: new FormControl(''),
    BusinessName1: new FormControl(''),
    Rent1: new FormControl(''),
    MessageTitle1: new FormControl(''),
    Message1: new FormControl('')
  });
  constructor(msgs: MessageService, svc: MemberInfoService, private DataHoldingService: DataHoldingService) {
    this.svc = svc;
    this.msgs = msgs;
  }

  ngOnInit(): void {
    this.MiModel = this.DataHoldingService.getData();
    this.RefreshData();
    this.RefreshMessages();
  }
  AddMember(): void {
    this.InModel.Name = this.AdminPage.controls.Name.value;
    this.InModel.Address = this.AdminPage.controls.Address.value;
    this.InModel.Email = this.AdminPage.controls.Email.value;
    this.InModel.ContactNumber = this.AdminPage.controls.ContactNumber.value;
    this.InModel.AccountType = this.AdminPage.controls.AccountType.value;
    this.InModel.HouseNo = this.AdminPage.controls.HouseNo.value;
    this.InModel.BusinessName = this.AdminPage.controls.BusinessName.value;
    this.InModel.Rent = this.AdminPage.controls.Rent.value;
    let output = this.svc.Validate(this.InModel);
    if (output == 'Valid') {
      this.svc.InsertMember(this.InModel).subscribe(data => {
        if (data != "Member not inserted") {
          this.AlertMessageTitle = "New account created ";
          this.AlertMessage = data;
          this.Alert = true;
          this.RefreshData();
        }
        else {
          this.AlertMessage = data;
          this.Alert2 = true;
        }
      });
    }
    else {
      this.AlertMessageTitle = output;
      this.Alert = true;
    }
  }
  Broadcast(): void {
    this.AlertMessage = this.msgs.ValidateMsg(this.AdminPage.controls.MessageTitle.value, this.AdminPage.controls.Message.value);
    if ( this.AlertMessage == 'Valid') {
      this.Msgm.SMID = this.MiModel.SMID;
      this.Msgm.Name = this.MiModel.Name;
      this.Msgm.AccountType = this.MiModel.AccountType;
      this.Msgm.MessageTitle = this.AdminPage.controls.MessageTitle.value;
      this.Msgm.Message = this.AdminPage.controls.Message.value;
      this.msgs.SendMessage(this.Msgm).subscribe(data => {
        this.AlertMessageTitle = data;
        if (data == "Message sent.") {
          this.AlertMessage = null;
          this.Alert = true;
          this.RefreshMessages();
        }
        else
          this.Alert2 = true;
      });
    }
    else {
      this.Alert2 = true;
    }
  }
  DeleteAllBroadcast(): void {
    this.SMID = this.MiModel.SMID;
    this.msgs.DeleteMessage(this.SMID).subscribe(data => {
      if (data) {
        this.AlertMessageTitle = "All Messages deleted.";
        this.Alert = true;
        this.RefreshMessages();
      }
      else {
        this.AlertMessage = "No message to delete.";
        this.Alert2 = true;
      }
    });
  }
  Search(): void {
    this.SMID = this.AdminPage.controls.SMID1.value;
    this.svc.GetMemberByID(this.SMID).subscribe((data: SocietyMemberInfoModel) => {
      if (data == null) {
        this.AlertMessage = "Invalid Society Member SMID.";
        this.Alert2 = true;
      }
      else {
        this.RemoveUpdateBtn = true;
        this.AdminPage.get('Name1').setValue(data.Name)
        this.AdminPage.get('Address1').setValue(data.Address)
        this.AdminPage.get('ContactNumber1').setValue(data.ContactNumber)
        this.AdminPage.get('Email1').setValue(data.Email)
        this.AdminPage.get('AccountType1').setValue(data.AccountType)
        this.AdminPage.get('Rent1').setValue(data.Rent)
      }
    });
  }
  UpdateInfo(): void {
    this.SMID = this.AdminPage.controls.SMID1.value;
    this.InModel.Name = this.AdminPage.controls.Name1.value;
    this.InModel.Address = this.AdminPage.controls.Address1.value;
    this.InModel.Email = this.AdminPage.controls.Email1.value;
    this.InModel.ContactNumber = this.AdminPage.controls.ContactNumber1.value;
    this.InModel.AccountType = this.AdminPage.controls.AccountType1.value;
    this.InModel.HouseNo = this.AdminPage.controls.HouseNo1.value;
    this.InModel.BusinessName = this.AdminPage.controls.BusinessName1.value;
    this.InModel.Rent = this.AdminPage.controls.Rent1.value;
    let output = this.svc.Validate(this.InModel);
    if (output == 'Valid') {
      this.svc.UpdateInfo(this.SMID, this.InModel).subscribe(data => {
        if (data != "Information Updated") {
          this.AlertMessage = "Account Information Not Updated";
          this.Alert2 = true;
        }
        else {
          this.AlertMessageTitle = data;
          this.AlertMessage = null;
          this.Alert = true;
          this.RefreshData();
        }
      });
    }
    else {
      this.AlertMessageTitle = output;
      this.Alert = true;
    }
  }
  RemoveMember(): void {
    this.SMID = this.AdminPage.controls.SMID1.value;
    if (this.SMID == this.MiModel.SMID)
      this.Alert3 = true;
    else {
      this.svc.DeleteMember(this.SMID).subscribe(data => {
        if (data) {
          this.AlertMessage = "Member's account associated with SMID: " + this.SMID + " has been removed";
          this.RemoveUpdateBtn = false;
          this.RefreshData();
        }
        else
          this.AlertMessage = "Invalid SMID";
        this.Alert2 = true;
      });
    }
  }
  CloseAlert(): void {
    this.Alert = false;
    this.Alert2 = false;
    this.Alert3 = false;
    this.AlertMessageTitle = null;
    this.AlertMessage = null;
  }
  RefreshData(): void {
    this.svc.GetAllMembers().subscribe((data: SocietyMemberInfoModel[]) => {
      this.result = data;
    });
  }
  RefreshMessages(): void {
    this.msgs.GetMessagesByID(this.MiModel.SMID).subscribe((data: MessageModel[]) => {
      this.SentMessageList = data;
      for (this.count = 0; this.count < data.length; this.count++) {
      }
    });
    this.msgs.MsgGetByAccType("ServiceProvider").subscribe((data: MessageModel[]) => {
      this.MsgFromServicePList = data;
      for (this.count1 = 0; this.count1 < data.length; this.count1++) {
      }
    });
  }
}

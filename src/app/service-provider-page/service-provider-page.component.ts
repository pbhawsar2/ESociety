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
  selector: 'app-service-provider-page',
  templateUrl: './service-provider-page.component.html',
  styleUrls: ['./service-provider-page.component.css']
})
export class ServiceProviderPageComponent implements OnInit {
  MiModel = new SocietyMemberInfoModel();
  result: SocietyMemberInfoModel[];
  TeamList: SocietyMemberInfoModel[];
  svc: MemberInfoService;
  msgs: MessageService;
  Msgm = new MessageModel();
  MsgFromTeamList: MessageModel[];
  SentMessageList: MessageModel[];
  AlertMessageTitle: string = null;
  AlertMessage: string = null;
  count: number = 0;
  count1: number = 0;
  Alert: boolean = false;
  Alert2: boolean = false;
  SMID: number;
  bgColor = 'primary';

  ServiceProviderPage = new FormGroup({
    MessageTitle: new FormControl(''),
    Message: new FormControl('')
  });
  constructor(msgs: MessageService, svc: MemberInfoService, private DataHoldingService: DataHoldingService) {
    this.svc = svc;
    this.msgs = msgs;
  }

  ngOnInit(): void {
    this.MiModel = this.DataHoldingService.getData();
    this.RefreshMessages();
    this.RefreshData();
  }
  Broadcast(): void {
    this.Msgm.SMID = this.MiModel.SMID;
    this.Msgm.Name = this.MiModel.Name;
    this.Msgm.AccountType = this.MiModel.AccountType;
    this.Msgm.MessageTitle = this.ServiceProviderPage.controls.MessageTitle.value;
    this.Msgm.Message = this.ServiceProviderPage.controls.Message.value;
    this.msgs.SendMessage(this.Msgm).subscribe(data => {
      this.AlertMessageTitle = data;
      if (data == "Message sent.") {
        this.Alert = true;
        this.RefreshMessages();
      }
      else
        this.Alert2 = true;
    });
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
  RefreshData(): void {
    this.svc.GetByAccType("Admin").subscribe((data: SocietyMemberInfoModel[]) => { // Get all Admin data
      this.TeamList = data;
    });
  }
  RefreshMessages(): void {
    this.msgs.MsgGetByAccType("Admin").subscribe((data: MessageModel[]) => {
      this.MsgFromTeamList = data;
      for (this.count = 0; this.count < data.length; this.count++) {
      }
    });
    this.msgs.GetMessagesByID(this.MiModel.SMID).subscribe((data: MessageModel[]) => {
      this.SentMessageList = data;
      for (this.count1 = 0; this.count1 < data.length; this.count1++) {
      }
    });
  }
}

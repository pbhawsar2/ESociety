import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, FormControl} from '@angular/forms';
import{ Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { animation } from '@angular/animations';
import { fade } from '../animation';
import { DataHoldingService } from '../data-holding.service';
import { SocietyMemberInfoModel } from '../society-member-info-model'
import { MemberInfoService } from '../member-info.service';
import { MessageService } from '../message.service';
import { MessageModel } from '../message-model';
import { from } from 'rxjs';

@Component({
  selector: 'app-society-member-page',
  templateUrl: './society-member-page.component.html',
  styleUrls: ['./society-member-page.component.css']
})
export class SocietyMemberPageComponent implements OnInit {
  MiModel = new SocietyMemberInfoModel();
  MsgFromServicePList: MessageModel[];
  MsgFromTeamList: MessageModel[];
  result: SocietyMemberInfoModel[];
  TeamList: SocietyMemberInfoModel[];
  msgs : MessageService;
  svc: MemberInfoService;
  count: number = 0;
  count1 : number = 0;
  bgColor = 'primary';

  SocietyMemberPage = new FormGroup({ 
    Name: new FormControl(''), 
    Address : new FormControl(''),
    Email: new FormControl(''),  
    ContactNumber : new FormControl(''),
    BusinessName : new FormControl('')
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
  RefreshData(): void{
    this.svc.GetByAccType("ServiceProvider").subscribe((data: SocietyMemberInfoModel[])=>{ // Get all Service Provider data
      this.result = data;
    });
    this.svc.GetByAccType("Admin").subscribe((data: SocietyMemberInfoModel[])=>{ // Get all Admin data
      this.TeamList = data;
    });
  }
  RefreshMessages(): void {
    this.msgs.MsgGetByAccType("Admin").subscribe((data: MessageModel[]) => {
      this.MsgFromTeamList = data;
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
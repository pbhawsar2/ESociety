import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs/internal/observable';
import { MessageModel } from './message-model';
import { title } from 'process';

@Injectable({ 
  providedIn: 'root'
})

export class MessageService {
  http: HttpClient;
  url: string = 'http://localhost:53320/api/Message';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(http: HttpClient) {
    this.http = http;
  }
  GetAllMessage(): Observable<MessageModel[]> {
    return this.http.get<MessageModel[]>(this.url);
  }
  GetMessagesByID(SMID: number): Observable<MessageModel[]> {
    return this.http.get<MessageModel[]>(this.url + '/' + SMID);
  }
  SendMessage(Mm: MessageModel): Observable<string> {
    return this.http.post<string>(this.url, Mm, this.httpOptions);
  }
  DeleteMessage(SMID: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url + '/DeleteMessage/' + SMID);
  }
  MsgGetByAccType(AccType: string): Observable<MessageModel[]> {
    return this.http.get<MessageModel[]>(this.url + '/GetBy/' + AccType);
  }

  ValidateMsg(Title: string,Message: string){
    if(Title == '')
    return "Title can not be null."

    if(Message == '')
    return "Message can not be null."
    
    return "Valid";
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ChatMessage } from '../Models/ChatMessage';
import { UserHasJoined } from '../Models/UserHasJoined';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
messages: ChatMessage[] ;
messageReceived = new EventEmitter<ChatMessage>();
userJoined = new EventEmitter<UserHasJoined>();
connectionEstablished = new EventEmitter<Boolean>();

private connectionIsEstablished = false;
private _hubConnection: HubConnection;
constructor() {
  this.createConnection();
  this.registerOnServerEvents();
  this.startConnection();
 }

 sendChatMessage(message: ChatMessage) {
   console.log(message);
  this._hubConnection.invoke('SendMessage', message);
}
 //#region hub initi
 private createConnection() {
  this._hubConnection = new HubConnectionBuilder()
    .withUrl('https://localhost/chathub')
    .build();
}

private startConnection(): void {
  this._hubConnection
    .start()
    .then(() => {
      this.connectionIsEstablished = true;
      console.log('Hub connection started');
      this.connectionEstablished.emit(true);
    })
    .catch(err => {
      console.log('Error while establishing connection, retrying...');
      // setTimeout(this.startConnection(), 5000);
    });
}
private registerOnServerEvents(): void {
  this._hubConnection.on('ReceiveMessage', (data: any) => {
    console.log(data);
    this.messageReceived.emit(data);
  });
  this._hubConnection.on('JoinedRoom', (data: any) => {
    console.log(data);
    this.userJoined.emit(data);
  });
}
 //#endregion
}

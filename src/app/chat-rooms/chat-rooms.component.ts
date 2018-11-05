import { Component, OnInit, NgZone } from '@angular/core';
import { SignalRService } from '../services/SignalR.service';
import { ChatMessage } from '../Models/ChatMessage';
import { Tab } from '../Models/Tab';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.css']
})
export class ChatRoomsComponent {

  chatMessage: ChatMessage;
  canSendMessage: boolean;
  tabs: Tab[];
  currentRoom: string;

  constructor(private signalrService: SignalRService, private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
    this.chatMessage = new ChatMessage();
    this.tabs = [];
    this.tabs.push(new Tab('Lobby', 'Welcome to lobby'));
    this.tabs.push(new Tab('SignalR', 'Welcome to SignalR Room'));
    this.currentRoom = 'Lobby';
  }

  sendMessage() {
    if (this.canSendMessage) {
      this.chatMessage.room = this.currentRoom;
      this.signalrService.sendChatMessage(this.chatMessage);
    }
  }

  OnRoomChange(room) {
    this.currentRoom = room;
  }

  private subscribeToEvents(): void {
    this.signalrService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });

    this.signalrService.messageReceived.subscribe((message: ChatMessage) => {
      this._ngZone.run(() => {
        this.chatMessage = new ChatMessage();
        let room = this.tabs.find(t => t.heading === message.room);
        if (room) {
            room.messageHistory.push(new ChatMessage(message.user, message.message, message.room));
        }
      });
    });
  }

  // ngOnInit() {
  // }

}

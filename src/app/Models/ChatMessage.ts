export class ChatMessage {
  user: string;
  message: string;
  room: string;
  timeStamp: Date;
  constructor(user: string = '', message: string = '', room: string= '') {
    this.user = user;
    this.message = message;
    this.room = room;
  }
}

export class UserHasJoined {
    user: string;
    room: string;
    constructor(user: string = '', room: string= '') {
        this.user = user;
        this.room = room;
      }
}

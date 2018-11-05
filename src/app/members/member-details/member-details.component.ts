import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/User';
import { UserService } from '../../services/User.service';
import { AlertifyService } from '../../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
 user: User;
 galleryOptions: NgxGalleryOptions[];
 galleryImages: NgxGalleryImage[];
  constructor(private userService: UserService, private alertify: AlertifyService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.galleryOptions = [
    {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }
  ];
  }
//   loadUsers() {
//     this.userService.getUser(+this.route.snapshot.params['id'])
//     .subscribe((user: User) => {
//       this.user = user;
//   }, error => {
//     this.alertify.error(error);
//   });
// }
getImages() {
  const imageUrls = [];
  for (let i = 0; i < this.user.photos.length; i++) {
    imageUrls.push({
      small: this.user.photos[i].url,
      medium: this.user.photos[i].url,
      big: this.user.photos[i].url,
      descriptiom: this.user.photos[i].description,
    });
  }
  return imageUrls;
}
}

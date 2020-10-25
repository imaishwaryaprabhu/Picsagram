import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor() { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  cropImage() {
    this.imageChangedEvent = '';
  }

  deleteImage() {
    this.imageChangedEvent = '';
    this.croppedImage = '';
  }

}

import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { PostService } from '../post.service';
import { first, debounceTime } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  postForm: FormGroup;
  hasError = false;

  constructor(private postService: PostService, public dialogRef: MatDialogRef<NewPostComponent>) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      'steps': new FormArray([
        new FormGroup({
          'image': new FormControl('', [Validators.required])
        }),
        new FormGroup({
          'caption': new FormControl('', [Validators.required])
        })
      ])
    });
    console.log(this.postForm.get('steps').get([1]).get('caption'));
  }
  get formSteps(): AbstractControl {
    return this.postForm.get('steps');
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
    (<FormArray>this.formSteps).at(0).patchValue({ image: this.croppedImage });
    this.postForm.updateValueAndValidity();
    console.log(this.postForm);
  }

  deleteImage() {
    this.imageChangedEvent = '';
    this.croppedImage = '';
    (<FormArray>this.formSteps).at(0).patchValue({ image: this.croppedImage });
    this.postForm.updateValueAndValidity();
  }

  onSubmit(stepper: MatStepper) {
    if (this.postForm.invalid) {
        return;
    }

    this.postService.create(this.postForm.value.steps[1].caption, base64ToFile(this.postForm.value.steps[0].image))
    .pipe(first(), debounceTime(1000))
    .subscribe(() => {
      stepper.next();
      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);
    }, error => this.hasError = true );
}

}

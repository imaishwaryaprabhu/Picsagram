import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  @ViewChild('editForm', {static: false}) editForm: NgForm;
  constructor(
    private dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {post: Post},
    private postService: PostService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    console.log(this.data);
    setTimeout(() => {
      this.editForm.setValue({
        'caption': this.data.post.caption
      });
    }, 2000);
  }

  onUpdate() {
    console.log(this.editForm);

    if (this.editForm.invalid)
      return false;
    
    this.postService.update(this.data.post._id, this.editForm.value.caption)
    .subscribe(postData => {
      this.dialogRef.close(postData.post);
      this.snackBar.open('Post updated successfully');
    });
  }
}

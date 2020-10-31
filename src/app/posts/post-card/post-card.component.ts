import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { Post } from '../post.model';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { PostService } from '../post.service';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input('post') post: Post;
  constructor(
    public dialog: MatDialog, 
    private postService: PostService, 
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditPostComponent, {
      width: "50%",
      data: { post: this.post }
    });

    dialogRef.afterClosed().subscribe((updatedPost: Post) => {
      this.post.caption = updatedPost.caption;
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { 
        'title': "Confirm Deletion",
        'question': "Delete this post?"
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.postService.delete(this.post._id).subscribe(response => {
          this.snackBar.open('Post deleted successfully');
        });
      }
    });
  }

  onChangePrivacy() {
    if (!this.post.public) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { 
          'title': "Change Privacy?",
          'question': "Anyone will be able to see your post."
        }
      });
  
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.postService.changePostPrivacy(this.post._id, !this.post.public).subscribe(response => {
            this.snackBar.open('Post privacy changed');
          });
        }
      });
    } else {
      this.postService.changePostPrivacy(this.post._id, !this.post.public).subscribe(response => {
        this.snackBar.open('Post privacy changed');
      });
    }
  }

  onLike() {
    this.postService.likePost(this.post._id, !this.post.likedByUser);
  }
}

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

  openEditDialog(post: Post) {
    const dialogRef = this.dialog.open(EditPostComponent, {
      width: "50%",
      data: { post: post }
    });

    dialogRef.afterClosed().subscribe((updatedPost: Post) => {
      post.caption = updatedPost.caption;
    });
  }

  onDelete(post: Post) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { 
        'title': "Confirm Deletion",
        'question': "Delete this post?"
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.postService.delete(post._id).subscribe(response => {
          this.snackBar.open('Post deleted successfully');
        });
      }
    });
  }
}

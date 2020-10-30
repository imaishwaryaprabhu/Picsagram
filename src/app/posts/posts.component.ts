import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewPostComponent } from './new-post/new-post.component';
import { PostService } from './post.service';
import { Post } from './post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[];
  postSubscription: Subscription;

  constructor(public dialog: MatDialog, private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAll();
    this.postSubscription = this.postService.postListChanged$.subscribe(postData => {
      this.posts = postData.posts;
    });
  }

  openNewDialog() {
    const dialogRef = this.dialog.open(NewPostComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.postService.getAll();
    });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewPostComponent } from './new-post/new-post.component';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openNewDialog() {
    const dialogRef = this.dialog.open(NewPostComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

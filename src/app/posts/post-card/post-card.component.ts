import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditPostComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

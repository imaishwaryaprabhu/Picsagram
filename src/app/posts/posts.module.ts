import { NgModule } from '@angular/core';
import { NewPostComponent } from './new-post/new-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppMaterialModule } from '../app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './posts.component';
import { PostCardComponent } from './post-card/post-card.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        PostsComponent,
        PostCardComponent,
        NewPostComponent,
        EditPostComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ImageCropperModule,
        RouterModule
    ]
})

export class PostsModule {}
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './posts/posts.component';
import { PostCardComponent } from './posts/post-card/post-card.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { FooterComponent } from './footer/footer.component';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { SignInComponent } from './accounts/sign-in/sign-in.component';
import { SignUpComponent } from './accounts/sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    PostCardComponent,
    NewPostComponent,
    EditPostComponent,
    FooterComponent,
    SignInComponent,
    SignUpComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    AppMaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

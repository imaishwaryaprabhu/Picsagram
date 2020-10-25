import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { SignInComponent } from './accounts/sign-in/sign-in.component';
import { SignUpComponent } from './accounts/sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', redirectTo: '/posts', pathMatch: 'full' },
    { path: 'posts', component: PostsComponent },
    { path: 'accounts/signin', component: SignInComponent },
    { path: 'accounts/signup', component: SignUpComponent },
    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: "**", redirectTo: '/page-not-found' }
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
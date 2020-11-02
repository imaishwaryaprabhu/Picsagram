import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './accounts/auth.guard';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
    { path: '', redirectTo: '/posts', pathMatch: 'full' },
    { path: 'posts', canActivate: [AuthGuard], component: PostsComponent },
    { path: 'accounts', loadChildren: () => import('./accounts/accounts.module').then(module => module.AccountsModule) },
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
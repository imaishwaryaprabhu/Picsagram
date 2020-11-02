import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../app-material.module';
import { SharedModule } from '../shared/shared.module';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent
    ],
    imports: [
        AppMaterialModule,
        SharedModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'signin', component: SignInComponent },
            { path: 'signup', component: SignUpComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class AccountsModule {}
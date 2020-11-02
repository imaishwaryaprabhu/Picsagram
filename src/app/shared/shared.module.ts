import { NgModule } from '@angular/core';
import { ErrorComponent } from './error/error.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
    declarations: [
        ErrorComponent,
        ConfirmationDialogComponent
    ],
    imports: [
        AppMaterialModule
    ]
})

export class SharedModule {}
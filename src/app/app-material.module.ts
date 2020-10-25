import { NgModule } from '@angular/core';

import { 
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  } from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatGridListModule,
        MatCardModule,
        MatTooltipModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatDialogModule
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatGridListModule,
        MatCardModule,
        MatTooltipModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatDialogModule
    ],
    providers: []
})
export class AppMaterialModule { }
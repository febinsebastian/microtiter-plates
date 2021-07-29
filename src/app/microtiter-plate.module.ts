import { NgModule } from '@angular/core';
import { PlateSelectorComponent } from './plate-selector/plate-selector.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[ PlateSelectorComponent ],
    imports: [ CommonModule, FormsModule ],
    exports: [ PlateSelectorComponent ]
})
export class MicrotiterPlateModule {}
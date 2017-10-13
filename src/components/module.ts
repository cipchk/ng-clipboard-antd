import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { NzClipboardDirective } from './directive';
import { NzClipboardService } from './service';
import { NzClipboardConfig } from './config';
import { NzMessageModule } from 'ng-zorro-antd';

@NgModule({
    imports: [CommonModule, NzMessageModule],
    declarations: [NzClipboardDirective],
    providers: [NzClipboardService],
    exports: [NzClipboardDirective]
})
export class NzClipboardModule {
    static forRoot(config?: NzClipboardConfig): ModuleWithProviders {
        return {
            ngModule: NzClipboardModule,
            providers: [
                { provide: NzClipboardConfig, useValue: config }
            ]
        };
    }
}

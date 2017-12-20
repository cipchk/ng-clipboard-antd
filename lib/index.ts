import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzClipboardDirective } from './src/directive';
import { NzClipboardService } from './src/service';
import { NzClipboardConfig } from './src/config';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd';

// region: export

export { NzClipboardConfig } from './src/config';
export { NzClipboardDirective, NzClipboardNotify } from './src/directive';
export { NzClipboardService } from './src/service';

// endregion

@NgModule({
    imports: [CommonModule, NzMessageModule],
    declarations: [NzClipboardDirective],
    exports: [NzClipboardDirective]
})
export class NzClipboardModule {
    static forRoot(config?: NzClipboardConfig): ModuleWithProviders {
        return {
            ngModule: NzClipboardModule,
            providers: [
                NzClipboardService,
                NzMessageService,
                { provide: NzClipboardConfig, useValue: config }
            ]
        };
    }
}

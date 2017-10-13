import { Directive, OnInit, OnDestroy, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { NzClipboardService } from './service';
import { NzInputComponent } from 'ng-zorro-antd';

export interface NzClipboardNotify {
    /**
     * 是否复制成功
     */
    status: boolean;

    /**
     * 复制内容
     */
    content?: string;
}

@Directive({
    selector: '[nz-clipboard]'
})
export class NzClipboardDirective implements OnDestroy {

    @Input('nz-clipboard') content: string;

    @Input('nzTarget') target: HTMLInputElement | NzInputComponent;

    @Input('nzSuccessText') successText: string;

    @Input('nzErrorText') errorText: string;

    @Output('nzSuccess') success = new EventEmitter<NzClipboardNotify>();

    @Output('nzError') error = new EventEmitter<NzClipboardNotify>();

    constructor(private clipboardSrv: NzClipboardService) { }

    @HostListener('click', ['$event.target'])
    _click() {
        if (!this.clipboardSrv.isSupported) {
            this.handleResult(false, undefined);
        } else if (this.target) {
            let newTarget: HTMLInputElement = null;
            if (!(this.target instanceof HTMLInputElement)) {
                newTarget = this.target._el.querySelector('input,textarea') as HTMLInputElement;
            } else {
                newTarget = this.target;
            }
            this.clipboardSrv.isTargetValid(newTarget);
            this.handleResult(this.clipboardSrv.copyFromInputElement(newTarget, this.successText, this.errorText), newTarget.value);
        } else if (this.content) {
            this.handleResult(this.clipboardSrv.copyFromContent(this.content, this.successText, this.errorText), this.content);
        }
    }

    private handleResult(succeeded: Boolean, copiedContent: string | undefined) {
        if (succeeded) {
            this.success.emit({ status: true, content: copiedContent });
        } else {
            this.error.emit({ status: false });
        }
    }

    ngOnDestroy() {
        this.clipboardSrv.destroy();
    }

}

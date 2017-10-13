/**
 * The core function is ported from clipboard.js & ngx-clipboard
 * clipboard.js: https://github.com/zenorocha/clipboard.js
 * ngx-clipboard: https://github.com/maxisam/ngx-clipboard
 */
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';
import { NzClipboardConfig } from './config';

@Injectable()
export class NzClipboardService {

    private tempTextArea: HTMLTextAreaElement | undefined;
    private config: NzClipboardConfig;

    constructor(
        @Inject(DOCUMENT) private document: any,
        cog: NzClipboardConfig,
        private messageSrv: NzMessageService
    ) {
        this.config = Object.assign(new NzClipboardConfig(), cog);
    }

    get isSupported(): boolean {
        return !!this.document.queryCommandSupported && !!this.document.queryCommandSupported('copy');
    }

    isTargetValid(element: HTMLInputElement | HTMLTextAreaElement): boolean {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            if (element.hasAttribute('disabled')) {
                // tslint:disable-next-line:max-line-length
                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            }
            return true;
        }
        throw new Error('Target should be input or textarea');
    }

    /**
     * copyFromInputElement
     */
    copyFromInputElement(targetElm: HTMLInputElement | HTMLTextAreaElement, success?: string, error?: string): boolean {
        try {
            this.selectTarget(targetElm);
            const re = this.copyText();
            this.clearSelection(targetElm);
            this.handleMessage(true, success);
            return re;
        } catch (error) {
            console.warn('copy error', error);
            this.handleMessage(false, error);
            return false;
        }
    }

    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     */
    copyFromContent(content: string, success?: string, error?: string) {
        if (!this.tempTextArea) {
            this.tempTextArea = this.createTempTextArea(this.document);
            this.document.body.appendChild(this.tempTextArea);
        }
        this.tempTextArea.value = content;
        return this.copyFromInputElement(this.tempTextArea, success, error);
    }

    // remove temporary textarea if any
    destroy() {
        if (this.tempTextArea) {
            this.document.body.removeChild(this.tempTextArea);
            this.tempTextArea = undefined;
        }
    }

    // select the target html input element
    private selectTarget(inputElement: HTMLInputElement | HTMLTextAreaElement): number | undefined {
        if (inputElement.select) inputElement.select();
        if (inputElement.setSelectionRange) inputElement.setSelectionRange(0, inputElement.value.length);
        return inputElement.value.length;
    }

    private copyText(): boolean {
        return this.document.execCommand('copy');
    }

    // Removes current selection and focus from `target` element.
    private clearSelection(inputElement: HTMLInputElement | HTMLTextAreaElement) {
        // tslint:disable-next-line:no-unused-expression
        inputElement && inputElement.blur();
        window.getSelection().removeAllRanges();
    }
    // create a fake textarea for copy command
    private createTempTextArea(doc: Document): HTMLTextAreaElement {
        const isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
        let ta: HTMLTextAreaElement;
        ta = doc.createElement('textarea');
        // Prevent zooming on iOS
        ta.style.fontSize = '12pt';
        // Reset box model
        ta.style.border = '0';
        ta.style.padding = '0';
        ta.style.margin = '0';
        // Move element out of screen horizontally
        ta.style.position = 'absolute';
        ta.style[isRTL ? 'right' : 'left'] = '-9999px';
        // Move element to the same position vertically
        const yPosition = window.pageYOffset || doc.documentElement.scrollTop;
        ta.style.top = yPosition + 'px';
        ta.setAttribute('readonly', '');
        return ta;
    }

    private handleMessage(status: boolean, focus?: string) {
        if (typeof focus === 'undefined') {
            focus = status ? this.config.success : this.config.error;
        }
        if (status) {
            if (focus) this.messageSrv.success(focus);
        } else {
            if (focus) this.messageSrv.error(focus);
        }
    }
}

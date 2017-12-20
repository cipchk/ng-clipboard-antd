import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { NzClipboardService } from '../../lib/index';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html'
})
export class DemoComponent {

    content = `time ${+new Date}

    中文！@#￥%……&*`;

    constructor(private srv: NzClipboardService, public messageSrv: NzMessageService) {}

    copy() {
        this.srv.copyFromContent(`time ${+new Date}`);
    }
}

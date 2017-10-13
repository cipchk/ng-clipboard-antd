import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NzClipboardService } from 'ng-clipboard-antd';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DemoComponent {

    content = `time ${+new Date}

    中文！@#￥%……&*`;

    constructor(private srv: NzClipboardService, public messageSrv: NzMessageService) {}

    copy() {
        this.srv.copyFromContent(`time ${+new Date}`);
    }
}

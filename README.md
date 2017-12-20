# ng-clipboard-antd

A wrapper directive for clipboard.js, and base on ng-zorro-antd.

The core function is ported from [clipboard.js](https://github.com/zenorocha/clipboard.js)(@zenorocha) & [ngx-clipboard](https://github.com/maxisam/ngx-clipboard)(@maxisam), thanks.

[![NPM version](https://img.shields.io/npm/v/ng-clipboard-antd.svg)](https://www.npmjs.com/package/ng-clipboard-antd)

## Demo

[Live Demo](https://cipchk.github.io/ng-clipboard-antd/)

## 1、Install

```
npm install ng-clipboard-antd --save
```

Import the `NzClipboardModule` in to your projects.

```typescript
import { NzClipboardModule } from 'ng-clipboard-antd';

@NgModule({
    imports: [
        NzClipboardModule.forRoot()
    ]
})
export class AppModule { }
```

## 2、Usage

**nz-clipboard**

```html
<button nz-button [nz-clipboard]="'Content from ng-clipboard-antd'">Copy</button>
```

| Name    | Type           | Default  | Remark |
| ------- | ------------- | ----- | ----- |
| `[nzTarget]` | `HTMLInputElement` `NzInputComponent` |  | copy from a input or nz-input |
| `[nzSuccessText]` | `string` | 复制成功 | text of the success |
| `[nzErrorText]` | `string` | 复制失败 | text of the error |
| `(nzSuccess)` | `EventEmitter` |  | a success callback |
| `(nzError)` | `EventEmitter` |  | a error callback |

**NzClipboardService**

```typescript
constructor(private srv: NzClipboardService) {}

copy() {
    this.srv.copyFromContent(`time ${+new Date}`);
}
```

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ng-clipboard-antd/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ng-clipboard-antd/blob/master/LICENSE) file for the full text)

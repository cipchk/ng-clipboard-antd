import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightJsModule } from 'ngx-highlight-js';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzClipboardModule } from '../../lib/index';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [
    AppComponent, DemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CommonModule,
    HighlightJsModule,

    NgZorroAntdModule.forRoot(),
    NzClipboardModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

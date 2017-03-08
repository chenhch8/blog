/*
 * 通知弹窗弹出
 */
import {
  EventEmitter,
  Injectable
} from '@angular/core';

@Injectable()
export class AlertPopService {
  message: EventEmitter<Object> = new EventEmitter<Object>();
}

export const AlertPopServiceInjectable: any[] = [
  { provide: AlertPopService, useClass: AlertPopService }
]

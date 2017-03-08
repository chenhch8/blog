/*
 * 用于当登陆或注销成功时通知nav修改状态
 */
import {
  EventEmitter,
  Injectable
} from '@angular/core';

@Injectable()
export class NavLoginCommunicate {
  message: EventEmitter<boolean> = new EventEmitter<boolean>();
}

export const NavLoginServicesInjectable: any[] = [
  { provide: NavLoginCommunicate, useClass: NavLoginCommunicate }
];

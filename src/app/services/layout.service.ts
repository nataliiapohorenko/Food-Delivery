import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private sidebarToggleSubject = new Subject<void>();
  sidebarToggle$ = this.sidebarToggleSubject.asObservable();

  private backButtonLinkSubject = new Subject<string | undefined>();
  backButtonLink$ = this.backButtonLinkSubject.asObservable();

  toggleSidebar() {
    this.sidebarToggleSubject.next();
  }

  setBackButtonLink(link: string) {
    this.backButtonLinkSubject.next(link);
  }
}

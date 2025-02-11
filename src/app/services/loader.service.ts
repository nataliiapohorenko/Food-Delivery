import { Injectable, Signal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingCount = signal(0);

  loading: Signal<boolean> = computed(() => this.loadingCount() > 0);

  show() {
    this.loadingCount.set(this.loadingCount() + 1);
  }

  hide() {
    this.loadingCount.set(Math.max(this.loadingCount() - 1, 0));
  }
}

import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  RouterOutlet,
  RouterLink,
} from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { LayoutService } from '../services/layout.service';
import { RouteConfigInterface } from '../shared/models/route-config.model';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [RouterOutlet, CommonModule, RouterLink],
})
export class LayoutComponent implements OnInit, OnDestroy {
  routeConfig: RouteConfigInterface = {
    displayHeader: true,
    buttonAction: { type: '' },
    displayFooter: true,
  };

  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private layoutService: LayoutService = inject(LayoutService);
  private cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.setData();

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.setData();
      });
  }

  setData(): void {
    let currentRoute = this.activatedRoute;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    this.routeConfig = currentRoute.snapshot.data as RouteConfigInterface;
    if (
      this.routeConfig.buttonAction.type === 'router' &&
      !this.routeConfig.buttonAction.link
    )
      this.setButtonLink();
  }

  setButtonLink(): void {
    this.layoutService.backButtonLink$
      .pipe(takeUntil(this.destroy$))
      .subscribe(link => {
        this.routeConfig.buttonAction.link = link;
        this.cdRef.detectChanges();
      });
  }

  onButtonSidebarClick() {
    this.layoutService.toggleSidebar();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

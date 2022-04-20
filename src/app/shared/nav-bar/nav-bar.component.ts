import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faAddressCard, faBriefcase, faFileLines, faFolder } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  faAddressCard = faAddressCard;
  faFileLines = faFileLines;
  faFolder = faFolder;

  @Input() link!: string;
  $destroy = new Subject<void>();
  panelExpanded: boolean = true;
  innerWidth: number | undefined;

  // Route for 'back' button; default value is the browse page
  RETURN_ROUTE: string = '/home';

  constructor(
    private route: Router,
    private eRef: ElementRef
  ) {
    // add observable to automatically highlight active route.
    route.events.pipe(takeUntil(this.$destroy)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.link = e.url.split('/')[2];
      }
    });
  }

  getReturnRoute() {
    this.RETURN_ROUTE = '/dashboard/vendor';
  }

  ngOnInit(): void {
    this.link = this.route.url.split('/')[2];
    this.getReturnRoute();
    this.innerWidth = window.innerWidth;
    this.panelExpanded = this.innerWidth < 900 ? false : true;
  }

  ngOnDestroy(): void {
    this.$destroy.unsubscribe();
  }
  /**
   * Registers click events, specifically ones outside the component
   *
   * @param event the click event
   */
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (
      !this.eRef.nativeElement.contains(event.target) &&
      this.innerWidth &&
      this.innerWidth < 650 &&
      this.panelExpanded
    ) {
      this.panelExpanded = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.panelExpanded =
      this.innerWidth && this.innerWidth < 650 ? false : true;
  }

}

import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-card-render',
  templateUrl: './card-render.component.html',
  styleUrls: ['./card-render.component.css']
})
export class CardRenderComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: '1° 1°', cols: 1, rows: 1 },
          { title: '1° 2°', cols: 1, rows: 1 },
          { title: '1° 3°', cols: 1, rows: 1 },
          { title: '1° 4°', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: '1° 1°', cols: 2, rows: 1 },
        { title: '1° 2°', cols: 1, rows: 1 },
        { title: '1° 3°', cols: 1, rows: 2 },
        { title: '1° 4°', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}

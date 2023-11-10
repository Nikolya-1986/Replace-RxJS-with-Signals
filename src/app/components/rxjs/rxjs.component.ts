import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { USERS } from '../../constants/constant';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent {
  private readonly firstPage = 1;
  private itemsPerPage = 2;
  public searchInput$ = new BehaviorSubject('');
  public currentPage$ = new BehaviorSubject(this.firstPage);

  public paginatedAndFilteredUsers$ = combineLatest([
    this.currentPage$.pipe(distinctUntilChanged()),
    this.searchInput$.pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(),
      map((searchText: string) =>
        USERS.filter((user: { name: string; }) =>
          user.name.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    ),
  ]).pipe(
    map(([currentPage, filteredUsers]) => {
      const startIndex = (currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      console.log('RXJS');
      console.log('currentPage', currentPage);
      console.log('filteredUsers', filteredUsers);
      console.log('startIndex', startIndex);
      console.log('endIndex', endIndex);
      return filteredUsers.slice(startIndex, endIndex);
    })
  );

  public searchUser(searchText: string): void {
    this.searchInput$.next(searchText);
    if (this.currentPage$.value > this.firstPage) {
      this.currentPage$.next(this.firstPage);
    }
  }

  public goToPrevPage(): void {
    this.currentPage$.next(Math.max(this.currentPage$.value - 1, 1));
  }

  public goToNextPage(): void {
    this.currentPage$.next(
      Math.min(this.currentPage$.value + 1, this.itemsPerPage + 1)
    );
  }
}

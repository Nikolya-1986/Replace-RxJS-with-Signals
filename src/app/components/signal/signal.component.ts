import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { USERS } from '../../constants/constant';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.scss']
})
export class SignalComponent {

  private readonly firstPage = 1;
  private itemsPerPage = 2;
  public searchInput = signal('');
  public currentPage = signal(this.firstPage);

  constructor(){
    const effectRef = effect(() => {
      console.log('SIGNAL');
      console.log('currentPage', this.currentPage());
      console.log('filteredUsers', this.paginatedAndFilteredUsers());
    })
  }

  public paginatedAndFilteredUsers = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return USERS
      .filter((user) =>
        user.name.toLowerCase().includes(this.searchInput().toLowerCase())
      )
      .slice(startIndex, endIndex);
  });

  public searchUser(searchText: string): void {
    this.searchInput.set(searchText);
    if (this.currentPage() > this.firstPage) {
      this.currentPage.set(this.firstPage);
    }
  }

  public goToPrevPage(): void {
    this.currentPage.update((currentPage) => Math.max(currentPage - 1, 1));
  }

  public goToNextPage(): void {
    this.currentPage.update((currentPage) =>
      Math.min(currentPage + 1, this.itemsPerPage + 1)
    );
  }
}

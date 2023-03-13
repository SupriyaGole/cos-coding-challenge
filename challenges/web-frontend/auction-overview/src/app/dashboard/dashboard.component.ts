import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {interval, map, Subscription} from "rxjs";
import {AuctionItem, AuctionResponse} from "./dashboard.types";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private http: HttpClient;
  private data: any;
  private errorMessage: null;
  private subscription: Subscription;
  private url = `https://api-core-dev.caronsale.de/api/v2/auction/buyer/`

  constructor(http: HttpClient) {
    this.http = http;
    this.data = null;
    this.errorMessage = null;
    this.fetchAuctions();

    // Call getData() every 20 seconds
    this.subscription = interval(20000)
      .subscribe(() => {
        this.fetchAuctions();
      });
  }

  private fetchAuctions() {
    this.http.get<AuctionResponse>(this.url)
      .pipe(map((response: AuctionResponse) => this.mapAuctions(response.items)))
      .subscribe((response: AuctionItem[]) => {
        this.data = response;
      });
  }

  private mapAuctions(auctions: AuctionItem[]): AuctionItem[] {
    return auctions.map((auction) => {
      auction.formattedTime = this.formatTime(auction.remainingTimeInSeconds);
      return auction;
    });
  }

  private formatTime(totalSeconds: number) {
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const daysFormatted = days > 0 ? `${days} days, ` : '';
    const hoursFormatted = hours > 0 ? `${hours} hrs` : '';
    return `${daysFormatted}${hoursFormatted}`;
  }

  get dataSource() {
    return this.data;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Cancel the interval when the component is destroyed
  }
}

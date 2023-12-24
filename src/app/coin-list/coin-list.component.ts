import { Component, OnInit } from '@angular/core';
import { CoinService } from '../service/coin.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit{
  currency: string = 'INR';
  bannerData: any = [];

  constructor(private coinService: CoinService) {

  }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
  }


  getBannerData() {
    this.coinService.getTrendingCurrency(this.currency).subscribe(res => {
      console.log(res);
      this.bannerData = res;
    })
  }

  getAllData() {
    this.coinService.getCurrency(this.currency).subscribe(res => {
      console.log(res);
     
    })
  }

}

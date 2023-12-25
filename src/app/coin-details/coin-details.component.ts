import { Component } from '@angular/core';
import { CoinService } from '../service/coin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent {
  coinId!: string;
  coinData: any;
  currency : string = "INR";

  constructor(private coinService: CoinService,
    private activatedRoute: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.coinId = val['id'];
    });
    this.getCoinData();
  }

  getCoinData() {
    this.coinService.getCurrencyById(this.coinId).subscribe(res => {
      console.log(res);
      if(this.currency === "USD"){
        res.market_data.current_price.inr = res.market_data.current_price.usd;
        res.market_data.market_cap.inr = res.market_data.market_cap.usd;
      }
      res.market_data.current_price.inr = res.market_data.current_price.inr;
      res.market_data.market_cap.inr = res.market_data.market_cap.inr;
      this.coinData = res;
    })  
  }

}

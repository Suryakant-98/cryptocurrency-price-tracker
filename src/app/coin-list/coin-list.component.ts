import { CoinService } from '../service/coin.service';
import { Component,OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CurrencyService } from '../service/currency.service';



@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit{
  currency: string = 'INR';
  bannerData: any = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private coinService: CoinService,
    private router : Router,
    private currencyService : CurrencyService) {

  }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
    this.currencyService.getCurrency()
    .subscribe(val=>{
      this.currency = val;
      this.getAllData();
      this.getBannerData();
    })
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
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
     
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoDetails(row: any) {
    this.router.navigate(['coin-details',row.id])
  }


}

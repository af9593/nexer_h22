import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Claim } from 'src/app/model/claim';
import { ClaimsService } from 'src/app/service/claims.service';

@Component({
  selector: 'app-claims-table',
  templateUrl: './claims-table.component.html',
  styleUrls: ['./claims-table.component.css']
})
export class ClaimsTableComponent implements OnInit, AfterViewInit {
  claims: Claim[];
  displayedColumns: string[] = ['id', 'category', 'administration', 'description', 'classification', 'mltext', 'mlimage'];
  dataSource: MatTableDataSource<Claim>;

  constructor(private claimsservice: ClaimsService,) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    this. refresh();
  }

  refresh() {
    this.claimsservice.loadAll().subscribe((data: Claim[]) => {
      this.claims = data;
      this.dataSource = new MatTableDataSource<Claim>(this.claims);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

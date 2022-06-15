import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Claim } from 'src/app/model/claim';

const ELEMENT_DATA: Claim[] = [
  {"id": 1, "category": "Strand och Bad", "description": "Det är mycket tång som flutit upp på starnden", "classification": 4},
  {"id": 2, "category": "Belysning", "description": "Lucka på lyktstolpen är borta och sladdarna hänger ut", "classification": 1},
  {"id": 3, "category": "Lekplatser", "description": "Någon har eldat upp gungan på lekplatsen", "classification": 3},
  {"id": 4, "category": "Klotter", "description": "Någon har klottrat på elcentralen", "classification": 4},
  {"id": 5, "category": "Park och Natur", "description": "Någon har haft en pickninck i parken och inte plockat upp efter sig", "classification": 3},
  {"id": 6, "category": "Gator, gång och cykelvägar", "description": "Det ligger krossat glas på cykelbanan", "classification": 2},
  {"id": 7, "category": "Trafik och parkering", "description": "En bil står parkerad så inte sopbilen kan komma till och tömma miljöhuset till fastigheten", "classification": 2},
  {"id": 8, "category": "Hinder och tillgänglighet", "description": "Någon har slängt elscootrar på gångbanan", "classification": 1},
  {"id": 9, "category": "Nedskräpning", "description": "Någon har ställt ett gammalt kylskåp vid Magnus Stenbocks staty", "classification": 2},
  {"id": 10, "category": "Rökfria offentliga miljöer", "description": "Någon har rökt på toaletten på Knutpunkten", "classification": 3}  
];

@Component({
  selector: 'app-claims-table',
  templateUrl: './claims-table.component.html',
  styleUrls: ['./claims-table.component.css']
})
export class ClaimsTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'category', 'description', 'classification'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

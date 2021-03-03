import { Component, Input, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    `
    mat-card{
      margin-top: 10px
    }
    `
  ]
})
export class ListadoComponent implements OnInit {

  heroes: Heroes[] = [];
  constructor( private heroesSvc: HeroesService) { }

  ngOnInit(): void {
    this.heroesSvc.getHeroes().subscribe( resp => {
      this.heroes = resp;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../interfaces/heroes.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  heroes: Heroes[] = [];
  termino: string = '';

  heroeSelecionado: Heroes | undefined;
  constructor( private heroesSvc: HeroesService,) { }

  ngOnInit(): void {

  }

  buscando(){
    this.heroesSvc.getSugerencia(this.termino.trim()).subscribe( resp =>{
      this.heroes = resp;
    });
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ){    

    if(!event.option.value){
      this.heroeSelecionado = undefined;
      this.termino = '';
      return;
    }
      const heroe: Heroes = event.option.value; 
  
      this.termino = heroe.superhero;
  
      this.heroesSvc.getHeroe(heroe.id)
        .subscribe( resp => this.heroeSelecionado = resp );

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroes, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img{
      width: 100%;
      border-radius: 5px;
    }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'Dc Comics',
      desc: 'Dc - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroes = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }
  constructor( private heroesSvc: HeroesService,
               private activateRoute: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {

    if( !this.router.url.includes('editar') ){
      return;
    }
    
    this.activateRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesSvc.getHeroe( id ))
      )
      .subscribe( heroe => this.heroe = heroe )

      
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id){

      this.heroesSvc.actualizarHeroe( this.heroe )
        .subscribe( heroe => {
          console.log('Heroe Actualizado', heroe);
          
        })
    }else{

      this.heroesSvc.agregarHeroe(this.heroe)
        .subscribe( resp =>{
          this.router.navigate(['/heroes/editar', resp.id])
        })

    }

  }
  
  borrarHeroe(){
    this.heroesSvc.borrarHeroe( this.heroe.id! )
      .subscribe( resp => {
        this.router.navigate(['/heroes']);
      });

  }
}

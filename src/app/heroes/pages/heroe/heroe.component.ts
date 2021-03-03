import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
    img{
      width: 100%;
      border-radius: 5px;
    }
    `
  ]
})
export class HeroeComponent implements OnInit {

  id: string = '';
  heroe!: Heroes;
  constructor( private heroeSvc: HeroesService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( resp => {
      this.id = resp.get('id')!;
    });

    this.heroeSvc.getHeroe(this.id).subscribe( resp => {
      this.heroe =  resp;
    });
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}

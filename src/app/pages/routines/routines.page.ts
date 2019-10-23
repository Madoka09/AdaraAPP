import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.page.html',
  styleUrls: ['./routines.page.scss'],
})
export class RoutinesPage implements OnInit {
  day: { name: string; }[];
  items: { expanded: boolean; meal: string; exer: string }[];

  constructor() {
    this.day = [
      { name: 'Pulsa el día de nuevo, porfavor.' },
      { name: 'Pulsa el día de nuevo, porfavor.' },
      { name: 'Pulsa el día de nuevo, porfavor.' },
      { name: 'Pulsa el día de nuevo, porfavor.' },
      { name: 'Pulsa el día de nuevo, porfavor.' }
    ];

   }

  ngOnInit() {
    this.items = [
      { expanded: false, meal: 'Rutina de Ejemplo', exer: 'Ejercicio de ejemplo' },
      { expanded: false, meal: 'Rutina de Ejemplo', exer: 'Ejercicio de ejemplo' },
      { expanded: false, meal: 'Rutina de Ejemplo', exer: 'Ejercicio de ejemplo' },
      { expanded: false, meal: 'Rutina de Ejemplo', exer: 'Ejercicio de ejemplo' },
      { expanded: false, meal: 'Rutina de Ejemplo', exer: 'Ejercicio de ejemplo' }
    ];
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

}

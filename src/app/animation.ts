import { animate, transition, state, style, trigger, keyframes } from '@angular/animations';

export let fade = trigger('fade',[
    state('void', style({ opacity: 0 })),
    transition(':enter, :leave', [
        animate(1000)
    ])
])
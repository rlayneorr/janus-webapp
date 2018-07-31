/*
*
*   Caliber Animations
*   - collection of animations
*
* */
import {animate, group, query, state, style, transition, trigger} from "@angular/animations";

//Fade in and out animation
export let fade = trigger('fade', [

  //configuring the state and style so we don't repeat the style every time
  state('void', style({opacity: 0})),

  //Transition Bidirectional from VOID state to DEFAULT STATE (*) <=>
  // void <=> * can be represented with ALIASES -> :enter and :leave
  //Timing is in milliseconds
  transition('void <=> *', [
    animate(600)
  ])

]);

export let moveMe = trigger('move', [
    state('center', style({
      transform: 'translateX(0) scaleX(1)'
    })),
    state('left', style({
      transform: 'translateX(-28%) scaleX(1)'
    })),
    transition('center =>left', animate('300ms ease-in')),
]);

// Animation after an item is removed from list
// in progress
export let removeItem = trigger('removeMe', [
    //configuring the state and style so we don't repeat the style every time
    state('normal', style({
      backgroundColor: 'red', opacity: 1})),
    state('removed', style({
      backgroundColor: 'yellow', opacity: 0.5})),

    //Transition Bidirectional from VOID state to DEFAULT STATE (*) <=>
    // void <=> * can be represented with ALIASES -> :enter and :leave
    transition('normal => removed', animate(1000)),
    transition('removed => normal', animate(1000))
]);

//routing animation - work in progress
// export let routeAnimation =
//   trigger('routeAnimation', [
//     transition('1 => 2', [
//         //Style height to match the height as it will be after the transition = !
//         style({height: '!'}),
//         query(':enter', style({transform: 'translate(100%)'})),
//         query(':enter, :leave', style({position: 'absolute', top: 0, left: 0, right: 0})),
//         group([
//           //once user leaves the page
//           query(':leave', [
//             animate('15.0s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(-100%)'})),
//           ]),
//           //once user enter another page
//           query(':enter', animate('10.0s cubic-bezier(.35, 0, .25, 1)'), style({transform: 'translateX(0)'})),
//         ])
//     ]),
//
//     transition('3 => 2, 2 => 1', [
//       style({height: '!'}),
//       query(':enter', style({transform: 'translateX(-100%)'})),
//       query(':enter', style({position: 'absolute', top: 0, left: 0, right: 0})),
//
//       group([
//         // animate the leave page away
//         query(':leave', [
//           animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
//         ]),
//         // and now reveal the enter
//         query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
//       ]),
//     ])
// ]);

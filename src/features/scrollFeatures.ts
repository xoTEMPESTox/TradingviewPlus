
// [ modifier, control ]
let scrollFeaturesModifiers = [false, false];

document.addEventListener('keydown', e => {
  if (e.key === 'Shift') scrollFeaturesModifiers[0] = true;
  if (e.key === 'Control') scrollFeaturesModifiers[1] = true;
})

document.addEventListener('keyup', e => {
  if (e.key === 'Shift') scrollFeaturesModifiers[0] = false;
  if (e.key === 'Control') scrollFeaturesModifiers[1] = false;
})

// Disable time scrolling if left shift modifier key is pressed
waitForElm('.chart-widget').then(() => {
  document.getElementsByClassName('chart-widget')[0].addEventListener('wheel', e => {
    if (scrollFeaturesModifiers[0] && (e as WheelEvent).clientX !== 0){
      // Zoom while scaling both price and time at the same time if modifier 2 is pressed
      if (!scrollFeaturesModifiers[1]) e.stopPropagation();

      // Just scroll price
      document.getElementsByClassName('price-axis')[0].dispatchEvent(new WheelEvent('wheel', {"deltaY": (e as WheelEvent).deltaY*8})) ;
    }
  }, true);
})

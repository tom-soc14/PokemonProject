import React, { useEffect } from 'react';

function SquareMovement() {
  useEffect(() => {
    const handleKeyPress = (event) => {
      const square = document.getElementById('square');
      const stepSize = 10;

      /*
The transform property is a CSS property that allows you to apply transformations to an element, such as translation, rotation, scaling, etc.
In the code above, getComputedStyle(square) retrieves the computed style of the square element, which includes the applied CSS styles.
getPropertyValue('transform') retrieves the value of the transform property from the computed style.


      */

      const transform = getComputedStyle(square).getPropertyValue('transform');
      const matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(', ');
      const [currentTranslateX, currentTranslateY] = matrix.slice(4, 6).map(parseFloat);

      const container = document.querySelector('.canvas');
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      let newTranslateX = currentTranslateX || 0;
      let newTranslateY = currentTranslateY || 0;

      switch (event.keyCode) {
        case 87: // W key
          newTranslateY = Math.max(0, newTranslateY - stepSize);
          break;
        case 65: // A key
          newTranslateX = Math.max(0, newTranslateX - stepSize);
          break;
        case 83: // S key
          newTranslateY = Math.min(containerHeight - square.clientHeight, newTranslateY + stepSize);
          break;
        case 68: // D key
          newTranslateX = Math.min(containerWidth - square.clientWidth, newTranslateX + stepSize);
          break;
        default:
          break;
      }

      square.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return <div id="square" className="square" style={{ transform: 'translate(0px, 0px)' }}></div>;
}

export default SquareMovement;

import {$, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL} from './globals';
import session from './session';

export class Guide {

  constructor({
    viewer,
    direction = DIRECTION_HORIZONTAL,
    id = Date.now(),
    rotation = 0,
    x,
    y
  }) {
    this.viewer = viewer;
    this.direction = direction;
    this.rotation = rotation;
    this.id = id;

    // Center guide by default
    this.point = this.viewer.viewport.getCenter();
    this.point.x = x ? x : this.point.x;
    this.point.y = y ? y : this.point.y;

    this.elem = createElem(this.direction, this.id);
    this.line = createLine();
    this.elem.appendChild(this.line);
    this.overlay = new $.Overlay(this.elem, this.point);
    this.draw();

    // Store guide in session
    this.saveInStorage();

    // Create rotation button
    // this.rotationButton = createRotationButton();
    // this.elem.appendChild(this.rotationButton);

    this.addHandlers();
  }

  addHandlers() {
    // Listen for mouse events on the guide
    this.tracker = new $.MouseTracker({
      element: this.elem,
      clickTimeThreshold: this.viewer.clickTimeThreshold,
      clickDistThreshold: this.viewer.clickDistThreshold,
      dragHandler: this.dragHandler.bind(this),
      dragEndHandler: this.dragEndHandler.bind(this),
      dblClickHandler: this.dblClickHandler.bind(this)
    });

    // this.tracker.clickHandler = this.clickHandler.bind(this)

    // Redraw guide when viewer changes
    this.viewer.addHandler('open', this.draw.bind(this));
    this.viewer.addHandler('animation', this.draw.bind(this));
    this.viewer.addHandler('resize', this.draw.bind(this));
    this.viewer.addHandler('rotate', this.draw.bind(this));
  }

  dblClickHandler() {
    this.popup = this.createRotationPopup();
    this.viewer.addControl(this.popup, {});
  }

  createRotationPopup() {
    const popup = document.createElement('div');
    popup.id = 'osd-guide-popup';
    popup.classList.add('osd-guide-popup');

    // Styling
    popup.style.display = 'block';
    popup.style.position = 'absolute';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.background = '#fff';
    popup.style.width = '200px';
    popup.style.height = '100px';
    popup.style.marginLeft = '-100px';
    popup.style.marginTop = '-50px';

    const input = document.createElement('input');
    input.type = 'number';
    popup.appendChild(input);

    const rotateButton = document.createElement('button');
    rotateButton.innerHTML = $.getString('Tool.rotate') || 'rotate';

    console.log('this', this);

    //add functionality to reset button
    rotateButton.addEventListener('click', () => {
      this.rotate(input.value);
    });

    popup.appendChild(rotateButton);

    return popup;
  }

  dragHandler(event) {
    const delta = this.viewer.viewport.deltaPointsFromPixels(event.delta, true);

    switch (this.direction) {
      case DIRECTION_HORIZONTAL:
        this.point.y += delta.y;
        break;
      case DIRECTION_VERTICAL:
        this.point.x += delta.x;
        break;
    }

    this.elem.classList.add('osd-guide-drag');
    this.draw();
  }

  dragEndHandler() {
    this.elem.classList.remove('osd-guide-drag');
    this.saveInStorage();
  }

  draw() {
    if (this.point) {
      this.overlay.update(this.point);
      this.overlay.drawHTML(this.viewer.drawer.container, this.viewer.viewport);
    }

    return this;
  }

  remove() {
    this.viewer.removeHandler('open', this.draw.bind(this));
    this.viewer.removeHandler('animation', this.draw.bind(this));
    this.viewer.removeHandler('resize', this.draw.bind(this));
    this.viewer.removeHandler('rotate', this.draw.bind(this));

    this.overlay.destroy();
    this.point = null;

    session.deleteGuide(this.id);

    return this;
  }

  rotate(deg) {
    if (parseFloat(deg)) {
      switch (this.direction) {
        case DIRECTION_HORIZONTAL:
          this.line.style.webkitTransform = `rotateZ(${deg}deg)`;
          this.line.style.transform = `rotateZ(${deg}deg)`;
          break;
        case DIRECTION_VERTICAL:
          this.line.style.webkitTransform = `rotateZ(${deg}deg)`;
          this.line.style.transform = `rotateZ(${deg}deg)`;
          break;
      }
    } else {
      this.line.style.webkitTransform = '';
      this.line.style.transform = '';
    }
  }

  saveInStorage() {
    if (session.useStorage) {
      session.addGuide(this.id, this.point.x, this.point.y, this.direction);
    }
  }
}

function createRotationButton() {
  const button = document.createElement('button');

  button.classList.add('osd-guide-rotation-button');
  button.innerHTML = 'Rotate';

  // Center button
  button.style.position = 'absolute';
  button.style.left = '50%';
  button.style.top = '50%';

  return button;
}

function createElem(direction, id) {
  const elem = document.createElement('div');
  elem.id = `osd-guide-${id}`;
  elem.classList.add('osd-guide');

  switch (direction) {
    case DIRECTION_HORIZONTAL:
      elem.classList.add('osd-guide-horizontal');
      break;
    case DIRECTION_VERTICAL:
      elem.classList.add('osd-guide-vertical');
      break;
    default:
      throw new Error('Invalid guide direction');
  }

  return elem;
}

function createLine() {
  const lineElem = document.createElement('div');
  lineElem.classList.add('osd-guide-line');
  return lineElem;
}

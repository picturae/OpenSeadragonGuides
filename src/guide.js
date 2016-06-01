import {$, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL} from './globals';

export class Guide {

  constructor(viewer, id, direction = DIRECTION_HORIZONTAL) {
    this.viewer = viewer;
    this.direction = direction;
    this.id = id;

    this._createOverlay();
  }

  remove() {
    this.viewer.removeOverlay(this.elem);
  }

  _createOverlay() {
    const centerPoint = new $.Point(
      this.viewer.viewport._oldCenterX,
      this.viewer.viewport._oldCenterY
    );

    this.elem = createElem(this.direction, this.id);
    this.viewer.addOverlay(this.elem, centerPoint);

    this.tracker = new $.MouseTracker({
      element: this.elem,
      clickTimeThreshold: this.viewer.clickTimeThreshold,
      clickDistThreshold: this.viewer.clickDistThreshold,
      dragHandler: $.delegate(this, this._dragHandler),
      dragEndHandler: $.delegate(this, this._dragEndHandler),
      clickHandler: $.delegate(this, this._clickHandler),
      dblClickHandler: $.delegate(this, this.remove)
      // startDisabled: !this.isSelecting,
    });
  }

  _dragHandler(event) {
    console.log(event);
  }

  _dragEndHandler(event) {
    console.log(event);
  }

  _clickHandler(event) {
    console.log(event);
  }
}

function createElem(direction, id) {
  const elem = document.createElement('div');

  elem.id = `guide-${id}`;
  elem.classList.add('guide');

  switch (direction) {
    case DIRECTION_HORIZONTAL:
      elem.classList.add('guide-horizontal');
      break;
    case DIRECTION_VERTICAL:
      elem.classList.add('guide-vertical');
      break;
    default:
      throw new Error('Invalid guide direction');
  }

  return elem;
}

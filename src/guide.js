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
      dragHandler: this._dragHandler.bind(this),
      dragEndHandler: this._dragEndHandler.bind(this),
      dblClickHandler: this.remove.bind(this)
    });
  }

  _dragHandler(event) {
    this.elem.classList.add('guide-drag');
    console.log(this.viewer.currentOverlays);
  }

  _dragEndHandler(event) {
    this.elem.classList.remove('guide-drag');
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

import {$} from './globals';

export class Guide {

  constructor(viewer, id, direction) {
    this.viewer = viewer;
    this.direction = direction;
    this.id = id;

    this._createOverlay();
  }

  _createOverlay() {
    const elem = createElem(this.direction, this.id);
    const centerPoint = new $.Point(
      this.viewer.viewport._oldCenterX,
      this.viewer.viewport._oldCenterY
    );

    this.viewer.addOverlay(elem, centerPoint);
  }
}

Guide.DIRECTION_HORIZONTAL = Symbol('horizontal');
Guide.DIRECTION_VERTICAL = Symbol('vertical');

function createElem(direction, id) {
  const elem = document.createElement('div');

  elem.id = `guide-${id}`;
  elem.classList.add('guide');

  switch (direction) {
    case Guide.DIRECTION_HORIZONTAL:
      elem.classList.add('guide-horizontal');
      break;
    case Guide.DIRECTION_VERTICAL:
      elem.classList.add('guide-vertical');
      break;
    default:
      throw new Error('Invalid guide direction');
  }

  return elem;
}

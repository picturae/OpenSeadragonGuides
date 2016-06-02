import {$, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL} from './globals';

export class Guide {

  constructor(viewer, id, direction = DIRECTION_HORIZONTAL) {
    this.viewer = viewer;
    this.direction = direction;
    this.id = id;

    this.createOverlay();

    this.addHandlers();
  }

  addHandlers() {
    this.viewer.addHandler('open', this.draw.bind(this));
    this.viewer.addHandler('animation', this.draw.bind(this));
    this.viewer.addHandler('resize', this.draw.bind(this));
    this.viewer.addHandler('rotate', this.draw.bind(this));
  }

  createOverlay() {
    this.point = new $.Point(
      this.viewer.viewport._oldCenterX,
      this.viewer.viewport._oldCenterY
    );

    this.elem = createElem(this.direction, this.id);
    // this.viewer.addOverlay(this.elem, centerPoint);
    this.overlay = new $.Overlay(this.elem, this.point);
    this.draw();

    this.tracker = new $.MouseTracker({
      element: this.elem,
      clickTimeThreshold: this.viewer.clickTimeThreshold,
      clickDistThreshold: this.viewer.clickDistThreshold,
      dragHandler: this.dragHandler.bind(this),
      dragEndHandler: this.dragEndHandler.bind(this),
      dblClickHandler: this.remove.bind(this)
    });
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

    this.elem.classList.add('guide-drag');
    this.draw();
  }

  dragEndHandler() {
    this.elem.classList.remove('guide-drag');
  }

  draw() {
    if (this.point) {
      this.overlay.update(this.point);
      this.overlay.drawHTML(this.viewer.drawer.container, this.viewer.viewport);
    }

    return this;
  }

  remove() {
    this.overlay.destroy();
    this.point = null;

    return this;
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

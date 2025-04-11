import {$, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL} from './globals';
import session from './session';

export class Guide {

  constructor({
    clickHandler,
    direction = DIRECTION_HORIZONTAL,
    id = Date.now(),
    plugin,
    rotation = 0,
    viewer,
    x,
    y
  }) {
    this.viewer = viewer;
    this.plugin = plugin;
    this.direction = direction;
    this.rotation = rotation;
    this.id = id;

    // Center guide by default
    this.point = this.viewer.viewport.getCenter(true);
    this.point.x = x ? x : this.point.x;
    this.point.y = y ? y : this.point.y;

    this.elem = createElem(this.direction, this.id);
    this.line = createLine();
    this.elem.appendChild(this.line);

    if (direction === DIRECTION_VERTICAL) {
      this.point.y = -10;
      this.overlay = new $.Overlay({
        element: this.elem,
        location: this.point,
        height: 20,
        width: 0.0001
      });
    } else {
      this.point.x = -10;
      this.overlay = new $.Overlay({
        element: this.elem,
        location: this.point,
        width: 20,
        height: 0.0001
      });
    }

    this.draw();

    // Store guide in session
    this.saveInStorage();

    if(clickHandler && this.plugin.allowRotation) {
      this.clickHandler = clickHandler;
    }

    if(this.plugin.allowRotation) {
      this.rotate(this.rotation);
    }

    this.addHandlers();
  }

  /**
   * @private
   */
  addHandlers() {
    // Listen for mouse events on the guide
    this.tracker = new $.MouseTracker({
      element: this.elem,
      clickTimeThreshold: this.viewer.clickTimeThreshold,
      clickDistThreshold: this.viewer.clickDistThreshold,
      dragHandler: this.dragHandler.bind(this),
      dragEndHandler: this.dragEndHandler.bind(this),
      dblClickHandler: this.remove.bind(this)
    });

    if (this.clickHandler) {
      this.tracker.clickHandler = this.clickHandler.bind(this);
    }

    // Redraw guide when viewer changes
    this.viewer.addHandler('open', this.draw.bind(this));
    this.viewer.addHandler('animation', this.draw.bind(this));
    this.viewer.addHandler('resize', this.draw.bind(this));
    this.viewer.addHandler('rotate', this.draw.bind(this));
  }

  /**
   * @private
   * @param event
   */
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

    // Add css class so we can change mouse cursor with css
    this.elem.classList.add('osd-guide-drag');
    this.draw();
  }

  /**
   * @private
   */
  dragEndHandler() {
    this.elem.classList.remove('osd-guide-drag');
    this.saveInStorage();
  }

  /**
   * Draws html element in the OpenSeadragon viewer
   * @private
   * @returns {Guide}
   */
  draw() {
    if (this.point) {
      this.overlay.update(this.point);
      this.overlay.drawHTML(this.viewer.drawer.container, this.viewer.viewport);
    }

    return this;
  }

  /**
   * Destroys the guide instance and removes it from the session. Note that the object itself keeps existing.
   * @returns {Guide} The guide that was destroyed.
   */
  remove() {
    this.viewer.removeHandler('open', this.draw.bind(this));
    this.viewer.removeHandler('animation', this.draw.bind(this));
    this.viewer.removeHandler('resize', this.draw.bind(this));
    this.viewer.removeHandler('rotate', this.draw.bind(this));

    this.overlay.destroy();
    this.point = null;

    session.deleteGuide(this.id);

    if (this.plugin.allowRotation) {
      this.plugin.closePopup();
    }

    return this;
  }

  /**
   * Rotates guide by degrees (css transform)
   * @param deg
   */
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
      this.rotation = deg;
    } else {
      this.line.style.webkitTransform = '';
      this.line.style.transform = '';
      this.rotation = 0;
    }
    this.saveInStorage();
  }

  /**
   * Adds guide to sessionStorage when useStorage option is set
   */
  saveInStorage() {
    if (session.useStorage) {
      session.addGuide(
        this.id,
        this.point.x,
        this.point.y,
        this.direction,
        this.rotation
      );
    }
  }
}

/**
 * Creates DOM element representing the guide
 * @param {DIRECTION_HORIZONTAL | DIRECTION_VERTICAL} direction The direction of the guide to create the element for.
 * @param {string} id The id for the guide.
 * @returns {HTMLDivElement}
 */
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

/**
 * Creates DOM element which is used to visually (by css) show the guideline
 * @returns {HTMLDivElement}
 */
function createLine() {
  const lineElem = document.createElement('div');
  lineElem.classList.add('osd-guide-line');
  return lineElem;
}

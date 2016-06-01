export class Guide {

  constructor(viewer, id, direction) {
    this.viewer = viewer;
    this.direction = direction;
    this.id = id;

    this.createOverlay();
  }

  createOverlay() {
    this.viewer.addOverlay({
      id: this.id,
      className: 'guide guide-horizontal',
      x: this.viewer.viewport._oldCenterX,
      y: this.viewer.viewport._oldCenterY,
      width: 1,
      height: 0
    });
  }
}

Guide.HORIZONTAL = Symbol('horizontal');
Guide.VERTICAL = Symbol('vertical');

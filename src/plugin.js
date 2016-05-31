const $ = OpenSeadragon;

if (!$.version || $.version.major < 2) {
  throw new Error(
    'This version of OpenSeadragonRGB requires OpenSeadragon version 2.0.0+'
  );
}

$.Viewer.prototype.guides = function(options) {
  if (!this.guidesInstance || options) {
    options = options || {};
    options.viewer = this;
    this.guidesInstance = new $.Guides(options);
  }

  return this.guidesInstance;
};

$.Guides = function(options) {
  $.extend( true, this, {
    // internal state properties
    viewer: null

    // options
  }, options );
};

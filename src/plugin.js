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
  const self = this;

  $.extend(true, self, {
    // internal state properties
    viewer: null,

    // options
    prefixUrl: null,
    navImages: {
      guideHorizontal: {
        REST: 'button_rest.png',
        GROUP: 'button_grouphover.png',
        HOVER: 'button_hover.png',
        DOWN: 'button_pressed.png'
      },
      guideVertical: {
        REST: 'button_rest.png',
        GROUP: 'button_grouphover.png',
        HOVER: 'button_hover.png',
        DOWN: 'button_pressed.png'
      }
    }
  }, options );

  $.extend(true, self.navImages, this.viewer.navImages);

  const prefix = this.prefixUrl || this.viewer.prefixUrl || '';
  const useGroup = this.viewer.buttons && this.viewer.buttons.buttons;
  const anyButton = useGroup ? this.viewer.buttons.buttons[0] : null;
  const onFocusHandler = anyButton ? anyButton.onFocus : null;
  const onBlurHandler = anyButton ? anyButton.onBlur : null;

  this.horizontalGuideButton = new $.Button({
    element: this.horizontalGuideButton ? $.getElement(this.horizontalGuideButton) : null,
    clickTimeThreshold: this.viewer.clickTimeThreshold,
    clickDistThreshold: this.viewer.clickDistThreshold,
    tooltip: $.getString('Tooltips.HorizontalGuide') || 'Horizontal guide',
    srcRest: prefix + this.navImages.guideHorizontal.REST,
    srcGroup: prefix + this.navImages.guideHorizontal.GROUP,
    srcHover: prefix + this.navImages.guideHorizontal.HOVER,
    srcDown: prefix + this.navImages.guideHorizontal.DOWN,
    onRelease: this.createHorizontalGuide.bind(this),
    onFocus: onFocusHandler,
    onBlur:  onBlurHandler
  });

  this.verticalGuideButton = new $.Button({
    element: this.verticalGuideButton ? $.getElement(this.horizontalGuideButton) : null,
    clickTimeThreshold: this.viewer.clickTimeThreshold,
    clickDistThreshold: this.viewer.clickDistThreshold,
    tooltip: $.getString('Tooltips.VerticalGuide') || 'vertical guide',
    srcRest: prefix + this.navImages.guideVertical.REST,
    srcGroup: prefix + this.navImages.guideVertical.GROUP,
    srcHover: prefix + this.navImages.guideVertical.HOVER,
    srcDown: prefix + this.navImages.guideVertical.DOWN,
    onRelease: this.createVerticalGuide.bind(this),
    onFocus: onFocusHandler,
    onBlur:  onBlurHandler
  });

  if (useGroup) {
    this.viewer.buttons.buttons.push(this.horizontalGuideButton);
    this.viewer.buttons.element.appendChild(this.horizontalGuideButton.element);
    this.viewer.buttons.buttons.push(this.verticalGuideButton);
    this.viewer.buttons.element.appendChild(this.verticalGuideButton.element);
  }
};

$.extend($.Guides.prototype, $.ControlDock.prototype, {
  createHorizontalGuide() {
    console.log('Create horizontal guide');
  },

  createVerticalGuide() {
    console.log('Create vertical guide');
  }
});

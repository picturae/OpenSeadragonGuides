import {Guide} from './guide';
import {$, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL} from './globals';
import session from './session';

if (!$.version || $.version.major < 2) {
  throw new Error(
    'This version of OpenSeadragon Guides requires OpenSeadragon version 2.0.0+'
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
  $.extend(true, this, {
    // internal state properties
    viewer: null,
    guides: [],

    // options
    horizontalGuideButton: null,
    verticalGuideButton: null,
    prefixUrl: null,
    removeOnClose: false,
    useSessionStorage: false,
    navImages: {
      guideHorizontal: {
        REST: 'guidehorizontal_rest.png',
        GROUP: 'guidehorizontal_grouphover.png',
        HOVER: 'guidehorizontal_hover.png',
        DOWN: 'guidehorizontal_pressed.png'
      },
      guideVertical: {
        REST: 'guidevertical_rest.png',
        GROUP: 'guidevertical_grouphover.png',
        HOVER: 'guidevertical_hover.png',
        DOWN: 'guidevertical_pressed.png'
      }
    }
  }, options);

  $.extend(true, this.navImages, this.viewer.navImages);

  const prefix = this.prefixUrl || this.viewer.prefixUrl || '';
  const useGroup = this.viewer.buttons && this.viewer.buttons.buttons;
  const anyButton = useGroup ? this.viewer.buttons.buttons[0] : null;
  const onFocus = anyButton ? anyButton.onFocus : null;
  const onBlur = anyButton ? anyButton.onBlur : null;

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
    onFocus,
    onBlur
  });

  this.verticalGuideButton = new $.Button({
    element: this.verticalGuideButton ? $.getElement(this.verticalGuideButton) : null,
    clickTimeThreshold: this.viewer.clickTimeThreshold,
    clickDistThreshold: this.viewer.clickDistThreshold,
    tooltip: $.getString('Tooltips.VerticalGuide') || 'vertical guide',
    srcRest: prefix + this.navImages.guideVertical.REST,
    srcGroup: prefix + this.navImages.guideVertical.GROUP,
    srcHover: prefix + this.navImages.guideVertical.HOVER,
    srcDown: prefix + this.navImages.guideVertical.DOWN,
    onRelease: this.createVerticalGuide.bind(this),
    onFocus,
    onBlur
  });

  if (useGroup) {
    this.viewer.buttons.buttons.push(this.horizontalGuideButton);
    this.viewer.buttons.element.appendChild(this.horizontalGuideButton.element);
    this.viewer.buttons.buttons.push(this.verticalGuideButton);
    this.viewer.buttons.element.appendChild(this.verticalGuideButton.element);
  }

  // Store globally so it can be used in the Guide objects
  session.useStorage = this.useSessionStorage;

  // Check if any guides are stored in sessionStorage
  if (session.useStorage) {
    const guides = session.getGuides();

    guides.forEach(guide => {
      this.guides.push(new Guide(
        this.viewer,
        guide.direction === 'horizontal' ?
          DIRECTION_HORIZONTAL :
          DIRECTION_VERTICAL,
        guide.id,
        guide.x,
        guide.y
      ));
    });
  }

  // Remove guides when viewer closes
  if (this.removeOnClose) {
    this.viewer.addHandler('close', () => {
      this.guides.forEach(guide => guide.remove());
      this.guides = [];
    });
  }
};

$.extend($.Guides.prototype, {
  createHorizontalGuide() {
    this.guides.push(new Guide(this.viewer, DIRECTION_HORIZONTAL));
  },

  createVerticalGuide() {
    this.guides.push(new Guide(this.viewer, DIRECTION_VERTICAL));
  }
});


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
    allowRotation: false,
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
      const g = new Guide({
        viewer: this.viewer,
        direction: guide.direction === 'horizontal' ?
          DIRECTION_HORIZONTAL :
          DIRECTION_VERTICAL,
        rotation: guide.rotation,
        id: guide.id,
        clickHandler: () => this.showPopup(g),
        plugin: this,
        x: guide.x,
        y: guide.y
      });

      this.guides.push(g);
    });
  }

  // Remove guides when viewer closes
  if (this.removeOnClose) {
    this.viewer.addHandler('close', () => {
      this.guides.forEach(guide => guide.remove());
      this.guides = [];
    });
  }

  if (this.allowRotation) {
    this.popup = this.createRotationPopup();
    this.viewer.addControl(this.popup, {});
    this.popup.style.display = 'none'; //add Controll sets display:block
    this.popupInput = this.popup.querySelector('input');
  }
};

$.extend($.Guides.prototype, {
  createHorizontalGuide() {
    const guide = new Guide({
      viewer: this.viewer,
      plugin: this,
      direction: DIRECTION_HORIZONTAL,
      clickHandler: () => this.showPopup(guide)
    });
    this.guides.push(guide);
  },

  createVerticalGuide() {
    const guide = new Guide({
      viewer: this.viewer,
      plugin: this,
      direction: DIRECTION_VERTICAL,
      clickHandler: () => this.showPopup(guide)
    });
    this.guides.push(guide);
  },

  showPopup(guide) {
    this.popup.style.display = 'block';
    this.selectedGuide = guide;
    this.popupInput.value = this.selectedGuide.rotation;
  },

  closePopup() {
    this.popup.style.display = 'none';
    this.popupInput.value = '';
    this.selectedGuide = null;
  },

  // TODO: Refactor popup into new class
  createRotationPopup() {
    const popup = document.createElement('div');
    popup.id = 'osd-guide-popup';
    popup.classList.add('osd-guide-popup');
    popup.style.position = 'absolute';
    popup.style.bottom = '10px';
    popup.style.left = '10px';

    const form = document.createElement('form');
    form.classList.add('osd-guide-popup-form');
    form.style.display = 'block';
    form.style.position = 'relative';
    form.style.background = '#fff';
    form.style.padding = '10px';

    popup.appendChild(form);

    const input = document.createElement('input');
    input.type = 'number';
    input.style.display = 'inline-block';
    input.style.width = '50px';
    input.style.fontSize = '14px';
    form.appendChild(input);

    const rotateButton = document.createElement('button');
    rotateButton.type = 'submit';
    rotateButton.innerHTML = $.getString('Tool.rotate') || 'rotate';
    rotateButton.style.fontSize = '14px';
    rotateButton.classList.add('osd-guide-rotate-button');

    rotateButton.addEventListener('click', () => {
      this.selectedGuide.rotate(input.value);
      this.closePopup();
    });

    form.appendChild(rotateButton);

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.title = $.getString('Tool.close') || 'close';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.fontSize = '14px';
    closeButton.classList.add('osd-guide-close');
    closeButton.addEventListener('click', () => {
      this.closePopup();
    });
    form.appendChild(closeButton);

    return popup;
  }
});


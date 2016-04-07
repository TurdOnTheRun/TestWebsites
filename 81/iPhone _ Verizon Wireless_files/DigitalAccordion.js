(function() {
  'use strict';

  /**
   * Class constructor for Digital component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @constructor
   * @param {Element} element The element that will be upgraded.
   */
  function DigitalAccordion(element) {
    this._element = element;
    this._tabs = this._element.querySelectorAll('.' + this._CssClasses.ACCORDION_TAB);
    this._tabpanels = this._element.querySelectorAll('.' + this._CssClasses.ACCORDION_TABPANEL);
    this._init();
  }

  /**
   * Store strings for class names defined by this component that are used in
   * JavaScript. This allows us to simply change it in one place should we
   * decide to modify at a later date.
   *
   * @enum {string}
   * @private
   */
  DigitalAccordion.prototype._CssClasses = {
      ACCORDION: 'digi-accordion',
      ACCORDION_TAB: 'digi-accordion__tab',
      ACCORDION_TABPANEL: 'digi-accordion__tabpanel',
      IS_ACTIVE: 'is-active',
      IS_HIDDEN: 'is-hidden',
      IS_UPGRADED: 'is-upgraded' /* added to element after init */
  };

  /**
   * Store numbers for keycodes that are used in
   * JavaScript. This allows us to simply change it in one place should we
   * decide to modify at a later date.
   *
   * @enum {number}
   * @private
   */
  DigitalAccordion.prototype._KeyCodes = {
      ENTER: 13,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
  };

  /**
   * Initializes accordion by initializing
   * tab and tabpanels
   *
   * @private
   */
  DigitalAccordion.prototype._init = function() {
    this._initTabs();
    this._initTabpanels();
  };

  /**
   * Initializes Digital accordion by initializing tabs
   * set initial aria attributes and create
   * new Digital tab for each element
   *
   * @private
   */
  DigitalAccordion.prototype._initTabs = function() {
    for (var i = 0; i < this._tabs.length; i++) {
      if (i !== 0) {
        this._tabs[i].setAttribute('aria-expanded', 'false');
        this._tabs[i].setAttribute('tabindex', '-1');
      } else {
        this._tabs[i].setAttribute('aria-expanded', 'true');
        this._tabs[i].setAttribute('tabindex', '0');
        this._tabs[i].classList.add(this._CssClasses.IS_ACTIVE);
      }
      new DigitalTab(this._tabs[i], i, this);
    }
  }

  /**
   * Initializes Digital accordion by initializing tabpanels
   * set initial aria attributes and classnames
   *
   * @private
   */
  DigitalAccordion.prototype._initTabpanels = function() {
    for (var i = 0; i < this._tabpanels.length; i++) {
      if (i !== 0) {
        this._tabpanels[i].setAttribute('aria-hidden', 'true');
        this._tabpanels[i].classList.add(this._CssClasses.IS_HIDDEN);
      } else {
        this._tabpanels[i].setAttribute('aria-hidden', 'false');
        this._tabpanels[i].classList.remove(this._CssClasses.IS_HIDDEN);
      }
    }
  }

  /**
   * Reset all aria attributes and class names on each tab
   *
   * @private
   */
  DigitalAccordion.prototype._resetTabState = function() {
    for (var i = 0; i < this._tabs.length; i++) {
      this._tabs[i].setAttribute('aria-expanded', 'false');
      this._tabs[i].classList.remove(this._CssClasses.IS_ACTIVE);
      this._tabs[i].setAttribute('tabindex', '-1');
    }
  }

  /**
   * Reset all aria attributes and class names on each tabpanel
   *
   * @private
   */
  DigitalAccordion.prototype._resetTabpanelState = function() {
    for (var i = 0; i < this._tabpanels.length; i++) {
      this._tabpanels[i].setAttribute('aria-hidden', 'true');
      this._tabpanels[i].classList.add(this._CssClasses.IS_HIDDEN);
    }
  }


  /**
   * Constructor for an individual tab.
   *
   * @constructor
   * @param {Element} tab The HTML element for the tab.
   * @param {number} index of the tab in tabs NodeList.
   * @param {DigitalAccordion} ctx The DigitalAccordion object that owns the tab.
   */
  function DigitalTab(tab, index, ctx) {
    if (tab) {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        var tabpanelId = tab.getAttribute('aria-controls');
        var tabpanel = document.querySelector('#' + tabpanelId);
        if( tab.classList.contains('is-active') ) {
          tab.setAttribute('aria-expanded', 'false');
          tab.classList.remove(ctx._CssClasses.IS_ACTIVE);
          tabpanel.classList.add(ctx._CssClasses.IS_HIDDEN);
        } else {
          ctx._resetTabState();
          ctx._resetTabpanelState();
          tab.setAttribute('aria-expanded', 'true');
          tab.classList.add(ctx._CssClasses.IS_ACTIVE);
          tabpanel.classList.remove(ctx._CssClasses.IS_HIDDEN);
        }
      });
      tab.addEventListener('keydown', function (e) {
        var prev, next, target;
        prev = ctx._tabs[index - 1] || ctx._tabs[ctx._tabs.length - 1];
        next = ctx._tabs[index + 1] || ctx._tabs[0];

        switch(e.which) {
          case ctx._KeyCodes.ENTER:
            var eventClick = new Event('click');
            tab.dispatchEvent(eventClick);
            break;
          case ctx._KeyCodes.LEFT:
          case ctx._KeyCodes.UP:
            e.preventDefault();
            target = prev;
            break;
          case ctx._KeyCodes.RIGHT:
          case ctx._KeyCodes.DOWN:
            e.preventDefault();
            target = next;
            break;
          default:
            target = false;
            break;
        }

        if (target) {
          var tabpanelId = target.getAttribute('aria-controls');
          var tabpanel = document.querySelector('#' + tabpanelId);
          ctx._resetTabState();
          target.setAttribute('aria-selected', 'true');
          target.setAttribute('tabindex', '0');
          target.classList.add(ctx._CssClasses.IS_ACTIVE);
          target.focus();
          ctx._resetTabpanelState();
          tabpanel.classList.remove(ctx._CssClasses.IS_HIDDEN);
        }

      });
    }
  }

  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  componentHandler.register({
    constructor: DigitalAccordion,
    classAsString: 'DigitalAccordion',
    cssClass: 'digi-accordion'
  });

})();

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('simditor-alignments', ["jquery","simditor"], function (a0,b1) {
      return (root['AlignmentsButton'] = factory(a0,b1));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),require("simditor"));
  } else {
    root['AlignmentsButton'] = factory(root["jQuery"],root["Simditor"]);
  }
}(this, function ($, Simditor) {

var AlignmentsButton,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AlignmentsButton = (function(superClass) {
  extend(AlignmentsButton, superClass);

  function AlignmentsButton() {
    return AlignmentsButton.__super__.constructor.apply(this, arguments);
  }

  AlignmentsButton.prototype.name = "alignments";

  AlignmentsButton.prototype.icon = 'align-left';

  AlignmentsButton.prototype.htmlTag = 'p, h1, h2, h3, h4, td, th';

  AlignmentsButton.prototype._init = function() {
    this.menu = [
      {
        name: 'left',
        text: this._t('alignLeft'),
        icon: 'align-left',
        param: 'left'
      }, {
        name: 'center',
        text: this._t('alignCenter'),
        icon: 'align-center',
        param: 'center'
      }, {
        name: 'right',
        text: this._t('alignRight'),
        icon: 'align-right',
        param: 'right'
      }, {
        name: 'justify',
        text: this._t('alignJustify'),
        icon: 'align-left',
        param: 'justify'
      }
    ];
    return AlignmentsButton.__super__._init.call(this);
  };

  AlignmentsButton.prototype.setActive = function(active, align) {
    if (align == null) {
      align = 'left';
    }
    if (align !== 'left' && align !== 'center' && align !== 'right' && align !== 'justify') {
      align = 'left';
    }
    if (align === 'left') {
      AlignmentsButton.__super__.setActive.call(this, false);
    } else {
      AlignmentsButton.__super__.setActive.call(this, active);
    }
    this.el.removeClass('align-left align-center align-right align-justify');
    if (active) {
      this.el.addClass('align-' + align);
    }
    this.setIcon('align-' + align);
    return this.menuEl.find('.menu-item').show().end().find('.menu-item-' + align).hide();
  };

  AlignmentsButton.prototype._status = function() {
    this.nodes = this.editor.selection.nodes().filter(this.htmlTag);
    if (this.nodes.length < 1) {
      this.setDisabled(true);
      return this.setActive(false);
    } else {
      this.setDisabled(false);
      return this.setActive(true, this.nodes.first().css('text-align'));
    }
  };

  AlignmentsButton.prototype.command = function(align) {
    if (align !== 'left' && align !== 'center' && align !== 'right' && align !== 'justify') {
      throw new Error("simditor alignment button: invalid align " + align);
    }
    this.nodes.css({
      'text-align': align === 'left' ? '' : align
    });
    this.editor.trigger('valuechanged');
    return this.editor.inputManager.throttledSelectionChanged();
  };

  return AlignmentsButton;

})(Simditor.Button);

Simditor.Toolbar.addButton(AlignmentsButton);

return AlignmentsButton;

}));

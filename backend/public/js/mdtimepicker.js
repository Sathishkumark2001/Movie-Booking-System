/* -- DO NOT REMOVE --
 * jQuery MD-Time-Picker v1.1 plugin
 * 
 * Author: Dionlee Uy
 * Email: dionleeuy@gmail.com
 *
 * Edited:
 * Author: Patryk 'pcpl2' Ławicki
 * https://github.com/pcpl2
 * 
 * Date: 30.07.2020
 *
 * @requires jQuery
 * -- DO NOT REMOVE -- */
if (typeof jQuery === 'undefined') { throw new Error('MDTimePicker: This plugin requires jQuery'); }
+function ($) {
	var MDTP_DATA = "mdtimepicker", HOUR_START_DEG = 120, MIN_START_DEG = 90, END_DEG = 360, HOUR_DEG_INCR = 30, HOUR_24_DEG_INCR = 15, MIN_DEG_INCR = 6,
		EX_KEYS = [9, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123];

	var Time = function (hour, minute) {
		this.hour = hour;
		this.minute = minute;

		this.format = function(format, hourPadding) {
			var that = this, is24Hour = (format.match(/h/g) || []).length > 1;

			return $.trim(format.replace(/(hh|h|mm|ss|tt|t)/g, function (e) { 
				switch(e.toLowerCase()){
					case 'h':
						var hour = that.getHour(true);

						return (hourPadding && hour < 10 ? '0' + hour : hour);
					case 'hh': return (that.hour < 10 ? '0' + that.hour : that.hour);
					case 'mm': return (that.minute < 10 ? '0' + that.minute : that.minute);
					case 'ss': return '00';
					case 't': return is24Hour ? '' : that.getT().toLowerCase();
					case 'tt': return is24Hour ? '' : that.getT();
				}
			}));
		};

		this.setHour = function (value) { this.hour = value; };
		this.getHour = function (is12Hour) { return is12Hour ? [0, 12].indexOf(this.hour) >= 0 ? 12 : (this.hour % 12) : this.hour; };
		this.invert = function () {
			if (this.getT() === 'AM') this.setHour(this.getHour() + 12);
			else this.setHour(this.getHour() - 12);
		};
		this.setMinutes = function (value) { this.minute = value; }
		this.getMinutes = function (value) { return this.minute; }
		this.getT = function() { return this.hour < 12 ? 'AM' : 'PM'; };
	};

	var MDTimePicker = function (input, config) {
		var _ = this;

		this.visible = false;
		this.activeView = 'hours';
		this.hTimeout = null;
		this.mTimeout = null;
		this.input = $(input);
		this.config = config;
		this.time = new Time(0, 0);
		this.selected = new Time(0,0);
		this.timepicker = {
			overlay : $('<div class="mdtimepicker hidden"></div>'),
			wrapper : $('<div class="mdtp__wrapper"></div>'),
			timeHolder : {
				wrapper: $('<section class="mdtp__time_holder"></section>'),
				hour: $('<span class="mdtp__time_h">12</span>'),
				dots: $('<span class="mdtp__timedots">:</span>'),
				minute: $('<span class="mdtp__time_m">00</span>'),
				am_pm: $('<span class="mdtp__ampm">AM</span>')
			},
			clockHolder : {
				wrapper: $('<section class="mdtp__clock_holder"></section>'),
				am: $('<span class="mdtp__am">AM</span>'),
				pm: $('<span class="mdtp__pm">PM</span>'),
				clock: {
					wrapper: $('<div class="mdtp__clock"></div>'),
					dot: $('<span class="mdtp__clock_dot"></span>'),
					hours: $('<div class="mdtp__hour_holder"></div>'),
					minutes: $('<div class="mdtp__minute_holder"></div>')
				},
				buttonsHolder : {
					wrapper: $('<div class="mdtp__buttons">'),
					btnClear : $('<span class="mdtp__button clear-btn">Clear</span>'),
					btnOk : $('<span class="mdtp__button ok">Ok</span>'),
					btnCancel: $('<span class="mdtp__button cancel">Cancel</span>')
				}
			}
		};

		var picker = _.timepicker;

		_.setup(picker).appendTo('body');

		picker.clockHolder.am.click(function () { if (_.selected.getT() !== 'AM') _.setT('am'); });
		picker.clockHolder.pm.click(function () { if (_.selected.getT() !== 'PM') _.setT('pm'); });
		picker.timeHolder.hour.click(function () { if (_.activeView !== 'hours') _.switchView('hours'); });
		picker.timeHolder.minute.click(function () { if (_.activeView !== 'minutes') _.switchView('minutes'); });
		picker.clockHolder.buttonsHolder.btnOk.click(function () {
			_.setValue(_.selected);

			var formatted = _.getFormattedTime();

			_.triggerChange({ time: formatted.time, value: formatted.value });
			_.hide();
		});
		picker.clockHolder.buttonsHolder.btnCancel.click(function () { _.hide(); });

		if (_.config.clearBtn) {
			picker.clockHolder.buttonsHolder.btnClear.click(function () {
				_.input.val('')
					.attr('data-time', null)
					.attr('value', '');

				_.triggerChange({ time: null, value: '' });					
				_.hide();
			});
		}

		_.input.on('keydown', function (e) { 
			if (e.keyCode === 13) _.show();
			return !(EX_KEYS.indexOf(e.which) < 0 && _.config.readOnly); })
			.on('click', function () { _.show(); })
			.prop('readonly', _.config.readOnly);

		if (_.input.val() !== '') {
			var time = _.parseTime(_.input.val(), _.config.format);

			_.setValue(time);
		} else {
			var time = _.getSystemTime();

			_.time = new Time(time.hour, time.minute);
		}

		_.resetSelected();
		_.switchView(_.activeView);
	};

	MDTimePicker.prototype = {
		constructor : MDTimePicker,

		setup : function (picker) {
			if (typeof picker === 'undefined') throw new Error('Expecting a value.');

			var _ = this, overlay = picker.overlay, wrapper = picker.wrapper,
				time = picker.timeHolder, clock = picker.clockHolder;

			// Setup time holder

			if(!this.config.is24Hour) {
				time.wrapper.append(time.am_pm)
			}

			time.wrapper.append(time.hour)
				.append(time.dots)
				.append(time.minute)
				.appendTo(wrapper);

			// Setup hours
			for (var i = 0; i < 12; i++) {
				var value = i + 1, deg = (HOUR_START_DEG + (i * HOUR_DEG_INCR)) % END_DEG,
					hour = $('<div class="mdtp__digit rotate-' + deg + '" data-hour="' + value + '"><span>'+ value +'</span></div>');
				
				hour.find('span').click(function () {
					var _data = parseInt($(this).parent().data('hour')),
						_selectedT = _.selected.getT(),
						_value = (_data + ((_selectedT === 'PM' && _data < 12) || (_selectedT === 'AM' && _data === 12) ? 12 : 0)) % 24;

					_.setHour(_value);
					_.switchView('minutes');
				});

				clock.clock.hours.append(hour);
			}

			if(this.config.is24Hour) {
				for (var i = 12; i < 24; i++) {
					var deg = (HOUR_START_DEG + (i * HOUR_DEG_INCR)) % END_DEG
					if(i + 1 == 24) {
						var value = 00
					} else {
						var value = i + 1
					}

					var hour = $('<div class="mdtp__digit h24 rotate-' + deg + '" data-hour="' + value + '"><span>'+ value +'</span></div>');
					
					hour.find('span').click(function () {
						var _data = parseInt($(this).parent().data('hour'))
						_.setHour(_data);
						_.switchView('minutes');
					});

					clock.clock.hours.append(hour);
				}
			}

			// Setup minutes
			for (var i = 0; i < 60; i++) {
				var min = i < 10 ? '0' + i : i, deg = (MIN_START_DEG + (i * MIN_DEG_INCR)) % END_DEG,
					minute = $('<div class="mdtp__digit rotate-' + deg + '" data-minute="' + i + '"></div>');

				if (i % 5 === 0) minute.addClass('marker').html('<span>' + min + '</span>');
				else minute.html('<span></span>');

				minute.find('span').click(function () {
					_.setMinute($(this).parent().data('minute'));
				});

				clock.clock.minutes.append(minute);
			}

			// Setup clock
			if(!this.config.is24Hour) {
				clock.clock.wrapper.append(clock.am).append(clock.pm)
			}

			clock.clock.wrapper
				.append(clock.clock.dot)
				.append(clock.clock.hours)
				.append(clock.clock.minutes)
				.appendTo(clock.wrapper);

			// Setup buttons
			if (_.config.clearBtn) {
				clock.buttonsHolder.wrapper.append(clock.buttonsHolder.btnClear);
			}

			clock.buttonsHolder.wrapper.append(clock.buttonsHolder.btnCancel)
				.append(clock.buttonsHolder.btnOk)
				.appendTo(clock.wrapper);

			clock.wrapper.appendTo(wrapper);

			// Setup theme
			wrapper.attr('data-theme', _.config.theme || $.fn.mdtimepicker.defaults.theme);

			wrapper.appendTo(overlay);

			return overlay;
		},

		setHour : function (hour) {
			if (typeof hour === 'undefined') throw new Error('Expecting a value.');

			var that = this;

			this.selected.setHour(hour);
			this.timepicker.timeHolder.hour.text(this.selected.getHour(!that.config.is24Hour));

			this.timepicker.clockHolder.clock.hours.children('div').each(function (idx, div) {
				var el = $(div), val = el.data('hour');

				el[val === that.selected.getHour(!that.config.is24Hour) ? 'addClass' : 'removeClass']('active');
			});
		},

		setMinute : function (minute) {
			if (typeof minute === 'undefined') throw new Error('Expecting a value.');

			this.selected.setMinutes(minute);
			this.timepicker.timeHolder.minute.text(minute < 10 ? '0' + minute : minute);

			this.timepicker.clockHolder.clock.minutes.children('div').each(function (idx, div) {
				var el = $(div), val = el.data('minute');

				el[val === minute ? 'addClass' : 'removeClass']('active');
			});
		},

		setT : function (value) {
			if (typeof value === 'undefined') throw new Error('Expecting a value.');

			if (this.selected.getT() !== value.toUpperCase()) this.selected.invert();

			var t = this.selected.getT();

			this.timepicker.timeHolder.am_pm.text(t);
			this.timepicker.clockHolder.am[t === 'AM' ? 'addClass' : 'removeClass']('active');
			this.timepicker.clockHolder.pm[t === 'PM' ? 'addClass' : 'removeClass']('active');
		},

		setValue : function (value) {
			if (typeof value === 'undefined') throw new Error('Expecting a value.');

			var time = typeof value === 'string' ? this.parseTime(value, this.config.format) : value;

			this.time = new Time(time.hour, time.minute);

			var formatted = this.getFormattedTime();

			this.input.val(formatted.value)
				.attr('data-time', formatted.time)
				.attr('value', formatted.value);
		},

		resetSelected : function () {
			this.setHour(this.time.hour);
			this.setMinute(this.time.minute);
			this.setT(this.time.getT());
		},

		getFormattedTime : function () {
			var time = this.time.format(this.config.timeFormat, false),
				tValue = this.time.format(this.config.format, this.config.hourPadding);

			return { time: time, value: tValue };
		},

		getSystemTime : function () {
			var now = new Date();

			return new Time (now.getHours(), now.getMinutes());
		},

		parseTime : function (time, tFormat) {
			var that = this, format = typeof tFormat === 'undefined' ? that.config.format : tFormat,
                hLength = (format.match(/h/g) || []).length,
				is24Hour = hLength > 1,
				mLength = (format.match(/m/g) || []).length, tLength = (format.match(/t/g) || []).length,
				timeLength = time.length,
				fH = format.indexOf('h'), lH = format.lastIndexOf('h'),
				hour = '', min = '', t = '';

			// Parse hour
			if (that.config.hourPadding || is24Hour) {
				hour = time.substr(fH, 2);
			} else {
				var prev = format.substring(fH - 1, fH), next = format.substring(lH + 1, lH + 2);

				if (lH === format.length - 1) {
					hour = time.substring(time.indexOf(prev, fH - 1) + 1, timeLength);
				} else if (fH === 0) {
					hour = time.substring(0, time.indexOf(next, fH));
				} else {
					hour = time.substring(time.indexOf(prev, fH - 1) + 1, time.indexOf(next, fH + 1));
				}
			}

			format = format.replace(/(hh|h)/g, hour);

			var fM = format.indexOf('m'), lM = format.lastIndexOf('m'),
				fT = format.indexOf('t');

			// Parse minute
			var prevM = format.substring(fM - 1, fM), nextM = format.substring(lM + 1, lM + 2);

			if (lM === format.length - 1) {
				min = time.substring(time.indexOf(prevM, fM - 1) + 1, timeLength);
			} else if (fM === 0) {
				min = time.substring(0, 2);
			} else {
				min = time.substr(fM, 2);
			}

			// Parse t (am/pm)
			if (is24Hour) t = parseInt(hour) > 11 ? (tLength > 1 ? 'PM' : 'pm') : (tLength > 1 ? 'AM' : 'am');
			else t = time.substr(fT, 2);

			var isPm = t.toLowerCase() === 'pm',
				outTime = new Time(parseInt(hour), parseInt(min));
			if ((isPm && parseInt(hour) < 12) || (!isPm && parseInt(hour) === 12)) {
			    outTime.invert();
			}

			return outTime;
		},

		switchView : function (view) {
			var that = this, picker = this.timepicker, anim_speed = 350;

			if (view !== 'hours' && view !== 'minutes') return;

			that.activeView = view;

			picker.timeHolder.hour[view === 'hours' ? 'addClass' : 'removeClass']('active');
			picker.timeHolder.minute[view === 'hours' ? 'removeClass' : 'addClass']('active');

			picker.clockHolder.clock.hours.addClass('animate');
			if (view === 'hours') picker.clockHolder.clock.hours.removeClass('hidden');

			clearTimeout(that.hTimeout);

			that.hTimeout = setTimeout(function() {
				if (view !== 'hours') picker.clockHolder.clock.hours.addClass('hidden');
				picker.clockHolder.clock.hours.removeClass('animate');
			}, view === 'hours' ? 20 : anim_speed);

			picker.clockHolder.clock.minutes.addClass('animate');
			if (view === 'minutes') picker.clockHolder.clock.minutes.removeClass('hidden');

			clearTimeout(that.mTimeout);

			that.mTimeout = setTimeout(function() {
				if (view !== 'minutes') picker.clockHolder.clock.minutes.addClass('hidden');
				picker.clockHolder.clock.minutes.removeClass('animate');
			}, view === 'minutes' ? 20 : anim_speed);
		},

		show : function () {
			var that = this;

			if (that.input.val() === '') {
				var time = that.getSystemTime();
				this.time = new Time(time.hour, time.minute);
			}

			that.resetSelected();

			$('body').attr('mdtimepicker-display', 'on');

			that.timepicker.wrapper.addClass('animate');
			that.timepicker.overlay.removeClass('hidden').addClass('animate');
			setTimeout(function() {
				that.timepicker.overlay.removeClass('animate');
				that.timepicker.wrapper.removeClass('animate');

				that.visible = true;
				that.input.blur();
			}, 10);
		},

		hide : function () {
			var that = this;

			that.timepicker.overlay.addClass('animate');
			that.timepicker.wrapper.addClass('animate');
			setTimeout(function() {
				that.switchView('hours');
				that.timepicker.overlay.addClass('hidden').removeClass('animate');
				that.timepicker.wrapper.removeClass('animate');

				$('body').removeAttr('mdtimepicker-display');

				that.visible = false;
				that.input.focus();
			}, 300);
		},

		destroy: function () {
			var that = this;

			that.input.removeData(MDTP_DATA)
				.unbind('keydown').unbind('click')
				.removeProp('readonly');
			that.timepicker.overlay.remove();
		},

		triggerChange: function (evtObj) {
			this.input.trigger($.Event('timechanged', evtObj))
				.trigger('onchange')	// for ASP.Net postback
				.trigger('change');
		}
	};

	$.fn.mdtimepicker = function () {
		var mdtp_args = arguments, 
			arg0 = mdtp_args[0];

		return $(this).each(function (idx, el) {
			var that = this,
				$that = $(this),
				picker = $(this).data(MDTP_DATA);
				options = $.extend({}, $.fn.mdtimepicker.defaults, $that.data(), typeof arg0 === 'object' && arg0);

			if (!picker) {
				$that.data(MDTP_DATA, (picker = new MDTimePicker(that, options)));
			}

			if(typeof arg0 === 'string')
				picker[arg0].apply(picker, Array.prototype.slice.call(mdtp_args).slice(1));

			$(document).on('keydown', function (e) {
				if(e.keyCode !== 27) return;

				if (picker.visible) picker.hide();
			});
		});
	}

	$.fn.mdtimepicker.defaults = {
		timeFormat: 'hh:mm:ss.000',	// format of the time value (data-time attribute)
		is24Hour: true,             // show picker in 24 hour mode
		format: 'h:mm tt',			// format of the input value
		theme: 'blue',				// theme of the timepicker
		readOnly: true,				// determines if input is readonly
		hourPadding: false,			// determines if display value has zero padding for hour value less than 10 (i.e. 05:30 PM); 24-hour format has padding by default
		clearBtn: false             // determines if clear button is visible
	};
}(jQuery);
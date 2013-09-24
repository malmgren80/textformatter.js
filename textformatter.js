;(function (global, undefined) {

	var formatters = {};

	function format(text) {
		var args = Array.prototype.splice.call(arguments, 1);
		return text.replace(/{(\d+):?([a-zA-Z]*)}/g, function(match, index, pattern) { 
			var argument = args[index],
				formatter = pattern ? formatters[pattern] : undefined;

			if (!argument) {
				// parameter missing
				return match;
			}

			if (!formatter) {
				// unformatted
				return argument;
			}

			return formatter(argument);
    	});
	}

	function setFormat(pattern, formatter)
	{
		formatters[pattern] = formatter;
	}

	var textFormatter = {
		format: format,
		setFormat: setFormat
	};

	if (typeof exports === 'object') {
    	module.exports = textFormatter
  	} else if (typeof define === 'function' && define.amd) {
    	define(function () { return textFormatter })
  	} else {
    	global.TextFormatter = textFormatter
  	}	

}(this))
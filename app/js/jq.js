/* global jQuery */

//--------------------------------------------|
// jQUERY
//--------------------------------------------|
(function($, window, document) {

	'use strict';

	function json(callback) {
		$.getJSON('json/__output.json', function(data) {
			callback(data);
		});
	}
	json(function(data) {

		// COMMON VARIABLES
		//------------------------------------|
		// var speed = data.vars.speed;
		// var xs = data.vars.bp.xs;
		// var sm = data.vars.bp.sm;
		// var md = data.vars.bp.md;
		// var lg = data.vars.bp.lg;
		// var lgst = data.vars.bp.lgst;
		// var colorAlpha = data.vars.color.alpha;
		// var colorBeta = data.vars.color.beta;
		// var colorDelta = data.vars.color.delta;
		// var colorGamma = data.vars.color.gamma;

		// LET'S GO!
		//------------------------------------|
		console.log('Lets get started!');

	});

})(jQuery, window, document);

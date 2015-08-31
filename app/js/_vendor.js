/* global outdatedBrowser, FastClick, anchors, jQuery */

//--------------------------------------------|
// VENDOR PLUGINS
//--------------------------------------------|
(function($, window, document) {

	'use strict';

	// OUTDATED BROWSER (<= IE8)
	//----------------------------------------|
	outdatedBrowser({
		bgColor: '#f25648',
		color: '#ffffff',
		lowerThan: 'boxShadow',
		languagePath: ''
	});

	// FASTCLICK.JS
	//----------------------------------------|
	FastClick.attach(document.body);

	// ANCHOR.JS
	//----------------------------------------|
	anchors.options = {
		icon: '#'
	};
	anchors.add();

})(jQuery, window, document);

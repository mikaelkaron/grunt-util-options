/*
 * grunt-util-options
 * https://github.com/mikaelkaron/grunt-util-process
 *
 * Copyright (c) 2013 Mikael Karon
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
	"use strict";

	var _ = grunt.util._;
	var property = require("grunt-util-property")(grunt);

	return function (options) {
		var me = this;
		var name = me.name;
		var target = me.target;
		var args = me.args;

		_.each(_.rest(arguments), function (key, index) {
			property.call(options, key, _.find([
				args[index],
				grunt.option([ name, target, key ].join(".")),
				grunt.option([ name, key ].join(".")),
				grunt.option(key),
				options[key]
			], function (value) {
				return grunt.util.kindOf(value) !== "undefined";
			}));
		});

		return options;
	};
}
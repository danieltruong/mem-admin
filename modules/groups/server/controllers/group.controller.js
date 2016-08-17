'use strict';
// =========================================================================
//
// Controller for vcs
//
// =========================================================================
var path      = require('path');
var _         = require ('lodash');
var DBModel   = require (path.resolve('./modules/core/server/controllers/core.dbmodel.controller'));


module.exports = DBModel.extend ({
	name: 'Group',
	plural: 'groups',

	getForProject: function (id) {
		return this.list({project: id});
	},
});

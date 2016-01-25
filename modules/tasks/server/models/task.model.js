'use strict';
// =========================================================================
//
// Model for tasks
//
// =========================================================================
module.exports = require (require('path').resolve('./modules/core/server/controllers/core.models.controller'))
.generateModel ({
	value         : { type:Boolean, default:false },
	name          : { type:String, default:'New task' },
	description   : { type:String, default:'New task' },
	activity      : { type:'ObjectId', ref:'Activity', index:true , default:null},
	isRequired    : { type:Boolean, default:true },
	dateCompleted : { type:Date, default: null }, // date complete
	completedBy   : { type:'ObjectId', ref:'User' }
});

'use strict';
var Sequelize = require('sequelize');
var Config = require('./Config')();
var sequelize = new Sequelize('FuelStation_DEMO', Config.username, Config.password, {
	host: 'callsheet-mysql.cn6x6nhayn9c.us-west-2.rds.amazonaws.com',
	port: 3306,
    pool: {
        max: 10,
        min: 1,
        idle: 100
    }
});

var CheckoutChoice = sequelize.define('checkoutchoice', {
  CheckoutChoiceID: { 
	  type: Sequelize.INTEGER, 
	  primaryKey: true, 
      autoincrement: true, 
	  field: 'CheckoutChoiceID' 
  }, 
  CheckoutID: { type: Sequelize.INTEGER, field: 'CheckoutID' },
  ChoiceID: { type: Sequelize.INTEGER, field: 'ChoiceID' },
  isSnack: { type: Sequelize.BOOLEAN, field: 'IsSnack' },
  type: { type: Sequelize.INTEGER, field: 'Type' }
}, {
	tableName: 'CheckoutChoices'
});

var moduleName = "CHECKOUTCHOICE:";

module.exports.get = function(id,filter) {
    if (!id) return list(filter);
    console.log(moduleName, 'calling getSingle with id: ' + id);
    return sequelize.sync().then(function() {
        return CheckoutChoice.findById(id).then(function(checkoutchoice) {
            console.info(moduleName, 'checkoutchoice record found');
            return {
                count: (checkoutchoice)?1:0,
                checkoutchoices: [ (checkoutchoice)?checkoutchoice.dataValues:null ]
            };
        })
    });
}

function list(filter) {
    console.log(moduleName, 'calling getAll because no id provided');
	return sequelize.sync().then(function() {
        if (filter) {
            var filterOption = {
                where: {
                    CheckoutID: filter 
                } 
            };
            return CheckoutChoice.findAndCountAll(filterOption);
        } else return CheckoutChoice.findAndCountAll();
    }).then(function(result) {
		//return Athlete.findAndCountAll().then(function(result) {
        var checkoutchoices = [];
        result.rows.forEach(function(checkoutchoiceRow) {
            checkoutchoices.push(checkoutchoiceRow.dataValues);
        });
        return {
            count: result.count,
            checkoutchoices: checkoutchoices
        };
	});
}

module.exports.create = function(json) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'create a new checkoutchoice using JSON provided');
		console.error('need to add json validation to checkoutchoice creation');
		var checkoutchoiceJson = json;//JSON.parse(json);
		return CheckoutChoice.create(json).then(function(checkoutchoice) {
			console.info('checkoutchoice successfully created');
			return checkoutchoice;
		});
	});
};

module.exports.update = function(json) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'update a single checkoutchoice using JSON provided');
		console.error('need to add json validation to checkoutchoice update');
		var c = json;//JSON.parse(json);
		return CheckoutChoice.update(
			json,
			{ where: { CheckoutChoiceID: json.CheckoutChoiceID } }
		).then(function(result) {
			console.info(moduleName, 'checkoutchoice successfully updated');
			return result;
		});
	});
};

module.exports.delete = function(id) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'delete a checkoutchoice by id');
		return CheckoutChoice.destroy({ where: { CheckoutChoiceID: id } }).then(function(count) {
			console.info(moduleName, '(' + count.toString() + ') checkoutchoices successfully deleted');
			return count;
		});
	});
};

module.exports.close = function() {
	sequelize.close();
};
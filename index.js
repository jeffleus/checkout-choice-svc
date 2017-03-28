var CheckoutChoice = require('./CheckoutChoice');

var args = process.argv.slice(2);
//console.log(process.argv);

var checkoutchoice = {
    CheckoutChoiceID: 250127,
	CheckoutID: 93266, 
	ChoiceID: 3198, 
	type: 1,
	isSnack: false
};

var id = 250126;
var filter = ('250125,250124').split(',');
console.log("FILTER: ", filter);

//CheckoutChoice.get(id).then(function(student) {
//CheckoutChoice.get(null, filter).then(function(student) {
//CheckoutChoice.create(checkoutchoice).then(function(student) {
//CheckoutChoice.update(checkoutchoice).then(function(student) {
CheckoutChoice.delete(checkoutchoice.CheckoutChoiceID).then(function(student) {

//Choice.get(null, filter).then(function(student) {
//Choice.create(choice).then(function(student) {
//Choice.update(choice).then(function(student) {
    
//Sport.get(null, filter).then(function(student) {
//Sport.get('XXX').then(function(student) {
//Sport.create(sport).then(function(student) {
//Sport.update(sport).then(function(student) {
//Sport.delete('XXX').then(function(result) {
	
//Athletes.delete(1165).then(function(result) {
//Athletes.update(ath).then(function(student) {
//Athletes.create(ath).then(function(student) {
//Athletes.get(id, filter).then(function(student) {
//	console.log(result);
	console.log(student);
	return;
}).catch(function(err) {
	console.error(err);
	return;
}).finally(function() {
	CheckoutChoice.close();
	return;
});

function _logTest(id, filter) {
    console.log('ID: ', id);
    console.log('FILTER: ', filter);
};
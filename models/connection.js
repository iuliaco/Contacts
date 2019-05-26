const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/react');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("gata");
});
module.exports = db;


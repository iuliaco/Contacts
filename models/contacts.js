var mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: {
        type: String

    },
    company: {
        type: String,
    },
    about: {
        type: String,
    },
    gender:{
    type: Boolean //0 for boys 1 for girls
  },
    age:{
        type:Number
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    cathegory:{
        type:Number
    },
    
    tags: [{type: String}],
    Date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contacts', ContactsSchema);
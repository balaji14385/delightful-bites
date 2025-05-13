const mongoose = require('mongoose');
const con="mongodb+srv://balaji:harekrishna666$$$@project.caa1tsj.mongodb.net/sweet?retryWrites=true&w=majority&appName=project"
mongoose.connect(con)
const userSchema = new mongoose.Schema({
  name: String,
  mobile: { type: Number, unique: true },
  password: {type:String,unique:true}
});

module.exports = mongoose.model('logins', userSchema);
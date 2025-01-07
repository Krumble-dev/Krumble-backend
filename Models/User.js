import mongoose,{Schema} from "mongoose";


const oauthSchema = new Schema({
  google: {
    provider_id: { type: String, default: null },
    linked: { type: Boolean, default: false }
  }
}, { _id: false });


const userSchema = new Schema({
  name: { type: String, required: true, unique: true }, 
  email: { type: String, required: true, unique: true }, 
  phonenumber: { type: String, required: true},
  password_hash: { type: String }, 
  oauth: oauthSchema,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


const usrSchema = mongoose.model('Users', userSchema,'customCollectionName');


export default usrSchema;
import mongoose,{Schema} from "mongoose";


const userSchema = new Schema({
  phonenumber: { type: Number, required: true, unique: true },
  username: { type: String ,unique: true},
  location: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  collectedKrums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Krum" }],
});


const User = mongoose.model('Users', userSchema);


export default User;
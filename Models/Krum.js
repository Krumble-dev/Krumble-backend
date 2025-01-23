import mongoose,{Schema} from "mongoose";


const KrumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imgurl: {
        type: String,
        required: true
    },
    collectableKrums:{
        type:Number,
        required:true
    },
    geolocation:{
        type: {
            type: String,
            enum: ['Point'], 
            required: true,
          },
          coordinates: {
            type: [Number], 
            required: true,
          },
    },
    description:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required:true
    },
    collectedBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }]
});


KrumSchema.index({ geolocation: "2dsphere" });

const Krum = mongoose.model("Krum", KrumSchema);

export default Krum;
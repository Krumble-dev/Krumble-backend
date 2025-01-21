import mongoose from 'mongoose';

const arModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  location: { 
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }, 
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  collectedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
}, { timestamps: true });

arModelSchema.index({ location: '2dsphere' }); 

export default mongoose.model('ARModel', arModelSchema);

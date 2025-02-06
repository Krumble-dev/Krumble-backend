import mongoose from 'mongoose';

const KrumModel= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ModelURL: {
        type: String,
        required: true
    },
    ImageURL: {
        type: String,
        required: true
    },
  });

export default mongoose.model('KrumModel', KrumModel);



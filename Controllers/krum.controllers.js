// For handling the error and Response
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import CatchAsync from "../utils/CatchAsync.js";



import Krum from "../Models/Krum.js";




export const createKrum = CatchAsync(async (req, res, next) => {
    if(
        !req.body.name ||
        !req.body.imgurl ||
        !req.body.collectableKrums ||
        !req.body.geolocation ||
        !req.body.description
    ){
        return next(new ApiError(400,"Please provide all the required fields"));
    }

    const user = req.user;
    req.body.createdBy = user.id;
    const krum = await Krum.create(req.body);
    res.status(201).json(new ApiResponse(201,krum));
});


export const getKrums = CatchAsync(async (req, res, next) => {
    const user = req.user;
    const krums = await Krum.find({createdBy:user.id});
    res.status(200).json(new ApiResponse(200,krums));
});


export const getKrum = CatchAsync(async (req, res, next) => {
    const krum = await Krum.findById(req.query.id);
    if(!krum){
        return next(new ApiError(404,"Krum not found"));
    }
    res.status(200).json(new ApiResponse(200,krum));
});



export const updateKrum = CatchAsync(async (req, res, next) => {
    const krum = await Krum.findByIdAndUpdate(req.query.id,req.body,{
        new:true,
        runValidators:true
    });
    if(!krum){
        return next(new ApiError(404,"Krum not found"));
    }
    res.status(200).json(new ApiResponse(200,krum));
});


export const deleteKrum = CatchAsync(async (req, res, next) => {
    const krum = await Krum.findByIdAndDelete(req.query.id);
    if(!krum){
        return next(new ApiError(404,"Krum not found"));
    }
    // console.log("Krum deleted successfully");
    res.status(200).json(new ApiResponse(204,{msg:"Krum deleted successfully"}));
}
);


export const collectKrum = CatchAsync(async (req, res, next) => {
    const krum = await Krum.findById(req.query.id);
    if(!krum){
        return next(new ApiError(404,"Krum not found"));
    }

    if(krum.collectedBy.includes(req.user.id)){
        return next(new ApiError(400,"Krum already collected"));
    }

    if(krum.createdBy === req.user.id){
        return next(new ApiError(400,"You cannot collect your own Krum"));
    }

    if(krum.collectableKrums === krum.collectedBy.length){
        return next(new ApiError(400,"Krum already collected by all users"));
    }

    krum.collectedBy.push(req.user.id);
    krum.isActive = krum.collectableKrums === krum.collectedBy.length ? false : true;
    await krum.save();

    const user = req.user;
    user.collectedKrums = user.collectedKrums || [];
    user.collectedKrums.push(req.query.id);
    await user.save();

    res.status(200).json(new ApiResponse(200,{msg:"Krum collected successfully",krum}));
});


export const nearbyKrums = CatchAsync(async (req, res, next) => {
    const {latitude,longitude} = req.query;
    const krums = await Krum.find({
        geolocation:{
            $near:{
                $geometry:{
                    type:"Point",
                    coordinates:[longitude,latitude]
                },
                $maxDistance:10000
            }
        }
    });
    res.status(200).json(new ApiResponse(200,krums));
});



export default {
    createKrum,
    getKrums,
    getKrum,
    updateKrum,
    deleteKrum,
    collectKrum,
    nearbyKrums
}








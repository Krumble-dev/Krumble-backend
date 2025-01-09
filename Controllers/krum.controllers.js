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
    // console.log(user);
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


export default {
    createKrum,
    getKrums,
    getKrum,
    updateKrum,
    deleteKrum
}








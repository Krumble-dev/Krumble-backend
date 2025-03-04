import User from "../Models/User.js";

import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import CatchAsync from "../utils/CatchAsync.js";
import tokenService from "../utils/tokenUtils.js"

const createUser = CatchAsync(async (req, res, next) => {
  const {phonenumber }=req.body;
  if (!phonenumber) {
    return  next(new ApiError(400, "Please provide all the required fields"));
  }
  const query = {};
  if (phonenumber) query.phonenumber = phonenumber;
  const userExists = await User.findOne(query); 
  if (userExists) {
    const token = tokenService.generateAccessToken(userExists);
    return res.status(200).json(new ApiResponse(200, { authToken: token ,UserInfo:userExists }));
  } else {
    const Newuser = await User.create(req.body);
    const token = tokenService.generateAccessToken(Newuser);
    if (!token) {
      return res.status(401).next(new ApiError(400, "Token is required"));
    }
    return res.status(201).json(new ApiResponse(201, { authToken: token,UserInfo:Newuser  }));
  }
});


const HandleUserUpdate = CatchAsync(async (req, res, next) => {
  const { username, location  } = req.body;
  if (!username && !location) {
    return next(new ApiError(400, "At least one field (phonenumber, username, location) must be provided"));
  }
  
  if(username){
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(401).next(new ApiError(400, "Username already exists"));
    }
  }

  const allowedUpdates = {};
  if (username) allowedUpdates.username = username;
  if (location) allowedUpdates.location = location;
  const userId = req.user.id;


  
  const updatedUser = await User.findByIdAndUpdate(
      userId,
      allowedUpdates,
      { new: true, runValidators: true } 
  );


  if (!updatedUser) {
      return res.status(401).next(new ApiError(404, "User not found"));
  }
  res.status(200).json(new ApiResponse(200, { updatedUser }));
});

export default { createUser ,HandleUserUpdate}; 

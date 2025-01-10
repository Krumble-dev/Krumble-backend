import User from "../Models/User.js";

import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import CatchAsync from "../utils/CatchAsync.js";
import tokenService from "../utils/tokenUtils.js"

const createUser = CatchAsync(async (req, res, next) => {
  const {phonenumber}=req.body;
  if (!phonenumber) {
    return next(new ApiError(400, "Please provide all the required fields"));
  }
  const userExists = await User.findOne({ phonenumber: req.body.phonenumber });
  if (userExists) {
    const token = tokenService.generateAccessToken(userExists);
    return res.status(200).json(new ApiResponse(200, { authToken: token }));
  } else {
    const user = await User.create(req.body);
    const token = tokenService.generateAccessToken(user);
    return res.status(201).json(new ApiResponse(201, { authToken: token }));
  }
});


const HandleUserUpdate = CatchAsync(async (req, res, next) => {
  const { phonenumber, token } = req.body;
  if (!phonenumber || !token) {
    console.log("dd")
      return next(new ApiError(400, "Please provide all the required fields"));
  }
  const decoded = tokenService.verifyToken(token); 
  const userId = decoded.decoded.id;
  const updatedUser = await User.findByIdAndUpdate(
      userId,
      { phonenumber },
      { new: true} 
  );
  if (!updatedUser) {
      return next(new ApiError(404, "User not found"));
  }
  res.status(200).json(new ApiResponse(200, {updatedUser}));
});
export default { createUser ,HandleUserUpdate};

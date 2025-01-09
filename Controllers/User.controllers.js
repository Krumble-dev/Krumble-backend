import User from "../Models/User.js";

import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import CatchAsync from "../utils/CatchAsync.js";

import jwt from "jsonwebtoken";

const createUser = CatchAsync(async (req, res, next) => {
  const {phonenumber}=req.body;

  if (!phonenumber) {
    return next(new ApiError(400, "Please provide all the required fields"));
  }
  const userExists = await User.findOne({ phonenumber: req.body.phonenumber });
  if (userExists) {
    const authToken = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json(new ApiResponse(200, { authToken: authToken }));
  } else {
    const user = await User.create(req.body);
    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(201).json(new ApiResponse(201, { authToken:authToken }));
  }
});

export default { createUser };

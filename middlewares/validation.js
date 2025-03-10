import { body, query, validationResult } from "express-validator"
import { ApiError } from '../utils/ApiError.js'

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation failed", errors.array());
  }
  next();
};


const validateSchoolInput = [
  body("name").notEmpty().withMessage("School name is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("latitude").isFloat().withMessage("Latitude must be a number and required"),
  body("longitude").isFloat().withMessage("Longitude must be a number and required"),
  handleValidationErrors
];

const validateLocationQuery = [
  query("latitude").isFloat().withMessage("Latitude must be a number"),
  query("longitude").isFloat().withMessage("Longitude must be a number"),
  handleValidationErrors
];

export { validateSchoolInput, validateLocationQuery };

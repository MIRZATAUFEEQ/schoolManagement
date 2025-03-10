import { Router } from 'express'
import { createSchool, listSchools } from "../controllers/school.controller.js"
import { validateSchoolInput, validateLocationQuery } from "../middlewares/validation.js"

const router = Router()

router.route('/addschool').post(validateSchoolInput, createSchool)
router.route('/listSchools').get(validateLocationQuery, listSchools)

export default router;
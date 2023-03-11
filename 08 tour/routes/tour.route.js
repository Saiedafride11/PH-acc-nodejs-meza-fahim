const express=require('express')
const router=express.Router()
const tourController = require('../controllers/tour.controllers')




router.route('/tours')
.get(tourController.getTours)
.post(tourController.createTour)

router.route("/tours/bulk-update").patch(tourController.bulkUpdateTour)
router.route("/tours/bulk-delete").delete(tourController.bulkDeleteTour)
// .delete(tourController.deleteTourById)

router.route("/tours/:id")
.patch(tourController.updateTourById)
.delete(tourController.deleteTourById)

router.route("/tour/trending").get(tourController.getTrending)
router.route("/tour/cheapest").get(tourController.getCheapest)
router.route("/tour/:id").get(tourController.getTour)


module.exports=router
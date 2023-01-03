const express=require('express')
const { getAllJobs, getJob, updateJob, deleteJob, createJob } = require('../controllers/jobs')
const router=express.Router()

// router.get('/',getAllJobs)
// router.get('/',getJob)
// router.patch('/:id',updateJob)
// router.delete('/:id',deleteJob)
// router.post('/',createJob)

router.route('/').get(getAllJobs).post(createJob).patch(updateJob).delete(deleteJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)
module.exports=router
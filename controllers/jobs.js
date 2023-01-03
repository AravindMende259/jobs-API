const Job = require("../models/Job");
const User = require("../models/User");
var { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const getAllJobs = async (req, res) => {
  const job = await Job.find({ createdBy: req.user.userId });
  if (job.length === 0) {
    throw new NotFoundError(`No job found`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const getJob = async (req, res) => {
  // const {
  //   //  user: { userId },
  //   params: { id: jobId },
  // } = req;

  const job = await Job.findOne({
    _id: req.params.id,
    createdBy: req.user.userId,
  });
  console.log(req.params, "##########", req.params.id);
  if (!job) {
    throw new NotFoundError(`No job found`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  console.log("Here");
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ data: job, msg: "Coming hereeee" });
};

const updateJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  console.log(req.body, "#########");
  const job = await Job.findByIdAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  );
  console.log("update agudhaa", job);
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: req.params.id });
  if (!job) {
    throw new NotFoundError("Id is not found");
  }
  res
    .status(StatusCodes.ACCEPTED)
    .send(`one item deleted sucessfully ${req.params.id}`);

  //  res.status(StatusCodes.NO_CONTENT).send("Id not found")
};

module.exports = { createJob, getJob, updateJob, deleteJob, getAllJobs };

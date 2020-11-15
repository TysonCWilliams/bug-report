import mongoose from 'mongoose'
const Schema = mongoose.Schema
// const ObjectId = Schema.Types.ObjectId

const Bug = new Schema(
  {
    closed: { type: Boolean },
    description: { type: String, required: true },
    title: { type: String, required: true },
    closedDate: { type: Date },
    reportedBy: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Bug

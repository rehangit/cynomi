'use strict';
module.exports = (mongoose) => {
  const newSchema = new mongoose.Schema(
    {
      name: {
        type: String,
      },
      gender: {
        type: String,
      },
      date: {
        type: Date,
      },
      sleep: {
        type: Number,
      },
    },
    {
      timestamps: true,
    },
  );

  newSchema.index({ name: 1, gender: 1, date: 1 }, { unique: 1 });
  const SleepRecord = mongoose.model('SleepRecord', newSchema);
  return SleepRecord;
};

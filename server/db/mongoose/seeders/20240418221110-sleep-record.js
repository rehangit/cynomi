'use strict';

module.exports = {
  up: (models, mongoose) => {
    function generateRandomDataArray(size) {
      const femaleName = ['Alice', 'Diana', 'Eve', 'Finn', 'Isla', 'Anna', 'Michelle', 'Zoe'];
      const maleNames = [
        'Bob',
        'Charlie',
        'George',
        'Henry',
        'Jack',
        'Norman',
        'Peter',
        'Robert',
        'Thomas',
      ];
      const genders = ['Male', 'Female'];
      const maxDate = new Date(); // Up to today's date
      const minDate = new Date();
      minDate.setDate(maxDate.getDate() - 10);
      console.log({ minDate, maxDate })

      const dataArray = [];
      for (let i = 0; i < size; i++) {
        const genderIndex = Math.floor(Math.random() * genders.length);
        const gender = genders[genderIndex];
        const names = [maleNames, femaleName][genderIndex];
        const name = names[Math.floor(Math.random() * names.length)];
        const randomDate = new Date(
          minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()),
        );
        const sleep = Math.floor(Math.random() * 10) + 4; // Generate random sleep duration between 4 and 13 hours
        dataArray.push({ name, gender, date: randomDate.toISOString().slice(0, 10), sleep, createdAt: randomDate });
      }
      return dataArray;
    }

    const data = generateRandomDataArray(100);
    return Promise.all(data.map(({ name, gender, date, sleep }) => models.SleepRecord.findOneAndUpdate(
      /*filter: */ { name, gender, date },
      /*update: */ { sleep },
      /*options: */ { new: true, upsert: true },
    )));
  },

  down: (models, mongoose) => {
    return models.SleepRecord.deleteMany().then((res) => {
      console.log(res.deletedCount);
    });
  },
};

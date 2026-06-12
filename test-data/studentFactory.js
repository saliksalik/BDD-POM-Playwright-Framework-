// test-data/studentFactory.js
'use strict';

const { faker } = require('@faker-js/faker');

/**
 * Generates a dynamic student profile for the DemoQA Practice Form.
 * @returns {Object} Student data object
 */
function generateStudentProfile() {
  const firstName = faker.person.firstName();
  const lastName  = faker.person.lastName();

  return {
    firstName,
    lastName,
    email:          faker.internet.email({ firstName, lastName }).toLowerCase(),
    gender:         faker.helpers.arrayElement(['Male', 'Female', 'Other']),
    mobile:         faker.string.numeric(10),           // 10-digit number required
    dateOfBirth:    {
      day:   faker.number.int({ min: 1, max: 28 }).toString().padStart(2, '0'),
      month: faker.date.month(),                        // Full month name e.g. "January"
      year:  faker.number.int({ min: 1990, max: 2005 }).toString(),
    },
    subject:        faker.helpers.arrayElement(['Math', 'Physics', 'Chemistry', 'English']),
    hobby:          faker.helpers.arrayElement(['Sports', 'Reading', 'Music']),
    currentAddress: faker.location.streetAddress(),
    state:          'NCR',
    city:           'Delhi',
  };
}

module.exports = { generateStudentProfile };

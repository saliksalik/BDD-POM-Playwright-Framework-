const { test, expect } = require('../fixtures/pomFixtures');
const { generateStudentProfile } = require('../test-data/studentFactory');

test.describe('Practice Form', () => {
  test('should successfully submit the registration form with dynamic data', async ({ practiceFormPage }) => {
    const student = generateStudentProfile();

    await practiceFormPage.open();

    await practiceFormPage.fillName(student.firstName, student.lastName);
    await practiceFormPage.fillEmail(student.email);
    await practiceFormPage.selectGender(student.gender);
    await practiceFormPage.fillMobile(student.mobile);
    await practiceFormPage.fillDateOfBirth(student.dateOfBirth);
    await practiceFormPage.fillSubject(student.subject);
    await practiceFormPage.selectHobby(student.hobby);
    await practiceFormPage.fillAddress(student.currentAddress);
    await practiceFormPage.selectStateAndCity(student.state, student.city);

    await practiceFormPage.submit();

    // Verify modal is visible and contains student name
    await expect(practiceFormPage.confirmationModal).toBeVisible();
    await expect(practiceFormPage.confirmationModalTitle).toBeVisible();
    
    const fullName = `${student.firstName} ${student.lastName}`;
    await expect(practiceFormPage.confirmationModal).toContainText(fullName);
  });
});

const { test, expect } = require('../fixtures/pomFixtures');
const { UploadDownloadPage } = require('../pages/UploadDownloadPage');

test.describe('Upload and Download', () => {
  test('should upload a file and download sample', async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.open();

    // 1. Download
    const download = await uploadDownloadPage.downloadSampleFile();
    expect(download.suggestedFilename()).not.toBeNull();

    // 2. Upload
    const uploadPath = UploadDownloadPage.sampleFilePath();
    await uploadDownloadPage.uploadFile(uploadPath);

    // Verify upload success path display
    await expect(uploadDownloadPage.uploadedFilePath).toContainText('sample-upload.txt');
  });
});

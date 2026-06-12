'use strict';

const path = require('path');
const { BasePage } = require('./BasePage');
const { hideAds, scrollIntoCenter } = require('../utils/helpers');

class UploadDownloadPage extends BasePage {
  constructor(page) {
    super(page);
    this.uploadInput = page.locator('#uploadFile');
    this.uploadedFilePath = page.locator('#uploadedFilePath');
    this.downloadButton = page.locator('#downloadButton');
  }

  async open() {
    await this.navigate('/upload-download');
    await hideAds(this.page);
  }

  async uploadFile(filePath) {
    await this.uploadInput.setInputFiles(filePath);
  }

  async downloadSampleFile() {
    await scrollIntoCenter(this.downloadButton);
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadButton.click(),
    ]);
    return download;
  }

  static sampleFilePath() {
    return path.join(__dirname, '..', 'test-data', 'sample-upload.txt');
  }
}

module.exports = { UploadDownloadPage };

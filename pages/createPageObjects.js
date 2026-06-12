'use strict';

const { PracticeFormPage } = require('./PracticeFormPage');
const { TextBoxPage } = require('./TextBoxPage');
const { CheckBoxPage } = require('./CheckBoxPage');
const { RadioButtonPage } = require('./RadioButtonPage');
const { WebTablesPage } = require('./WebTablesPage');
const { ButtonsPage } = require('./ButtonsPage');
const { LinksPage } = require('./LinksPage');
const { BrokenLinksPage } = require('./BrokenLinksPage');
const { UploadDownloadPage } = require('./UploadDownloadPage');
const { DynamicPropertiesPage } = require('./DynamicPropertiesPage');
const { AlertsPage } = require('./AlertsPage');
const { BrowserWindowsPage } = require('./BrowserWindowsPage');
const { FramesPage } = require('./FramesPage');
const { WidgetsPage } = require('./WidgetsPage');
const { AutoCompletePage } = require('./AutoCompletePage');
const { DatePickerPage } = require('./DatePickerPage');
const { TabsPage } = require('./TabsPage');
const { ToolTipsPage } = require('./ToolTipsPage');
const { MenuPage } = require('./MenuPage');
const { SelectMenuPage } = require('./SelectMenuPage');
const { SortablePage } = require('./SortablePage');
const { SelectablePage } = require('./SelectablePage');
const { ResizablePage } = require('./ResizablePage');
const { InteractionsPage } = require('./InteractionsPage');
const { DraggablePage } = require('./DraggablePage');
const { LoginPage } = require('./LoginPage');
const { BookStorePage } = require('./BookStorePage');
const { ProfilePage } = require('./ProfilePage');
const { BookStoreApiPage } = require('./BookStoreApiPage');

/**
 * @param {import('playwright').Page} page
 */
function createPageObjects(page) {
  return {
    practiceFormPage: new PracticeFormPage(page),
    textBoxPage: new TextBoxPage(page),
    checkBoxPage: new CheckBoxPage(page),
    radioButtonPage: new RadioButtonPage(page),
    webTablesPage: new WebTablesPage(page),
    buttonsPage: new ButtonsPage(page),
    linksPage: new LinksPage(page),
    brokenLinksPage: new BrokenLinksPage(page),
    uploadDownloadPage: new UploadDownloadPage(page),
    dynamicPropertiesPage: new DynamicPropertiesPage(page),
    alertsPage: new AlertsPage(page),
    browserWindowsPage: new BrowserWindowsPage(page),
    framesPage: new FramesPage(page),
    widgetsPage: new WidgetsPage(page),
    autoCompletePage: new AutoCompletePage(page),
    datePickerPage: new DatePickerPage(page),
    tabsPage: new TabsPage(page),
    toolTipsPage: new ToolTipsPage(page),
    menuPage: new MenuPage(page),
    selectMenuPage: new SelectMenuPage(page),
    sortablePage: new SortablePage(page),
    selectablePage: new SelectablePage(page),
    resizablePage: new ResizablePage(page),
    interactionsPage: new InteractionsPage(page),
    draggablePage: new DraggablePage(page),
    loginPage: new LoginPage(page),
    bookStorePage: new BookStorePage(page),
    profilePage: new ProfilePage(page),
    bookStoreApiPage: new BookStoreApiPage(page),
  };
}

const PAGE_OBJECT_KEYS = [
  'practiceFormPage', 'textBoxPage', 'checkBoxPage', 'radioButtonPage', 'webTablesPage',
  'buttonsPage', 'linksPage', 'brokenLinksPage', 'uploadDownloadPage', 'dynamicPropertiesPage',
  'alertsPage', 'browserWindowsPage', 'framesPage', 'widgetsPage', 'autoCompletePage',
  'datePickerPage', 'tabsPage', 'toolTipsPage', 'menuPage', 'selectMenuPage', 'sortablePage',
  'selectablePage', 'resizablePage', 'interactionsPage', 'draggablePage', 'loginPage',
  'bookStorePage', 'profilePage', 'bookStoreApiPage',
];

module.exports = { createPageObjects, PAGE_OBJECT_KEYS };

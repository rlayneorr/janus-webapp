import {PanelPage} from './panel.po';

// const PanelPage = require('./panel.po');

describe('test-app App', () => {
  let page = new PanelPage();

  beforeEach(() => {
    page = new PanelPage();
  });

  it('should have a create panel button', () => {
    page.navigateTo();
    expect(page.getCreatePanelButton()).toBeTruthy();
  });
});

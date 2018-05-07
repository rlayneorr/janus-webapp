import { PanelPage } from './panel-e2e.po';

describe('test-app App', () => {
  let page: PanelPage;

  beforeEach(() => {
    page = new PanelPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

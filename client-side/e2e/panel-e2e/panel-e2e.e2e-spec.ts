import { PanelPage } from './panel-e2e.po';

describe('test-app App', () => {
  let page: PanelPage;

  beforeEach(() => {
    page = new PanelPage();
  });

  it('should have a create panel button', () => {
    page.navigateTo();
    expect(page.getCreatePanelButton()).toEqual('Create Panel');
  });
});

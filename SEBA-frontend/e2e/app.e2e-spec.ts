import { SEBAFrontendPage } from './app.po';

describe('seba-frontend App', () => {
  let page: SEBAFrontendPage;

  beforeEach(() => {
    page = new SEBAFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

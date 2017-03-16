import { MuAppPage } from './app.po';

describe('mu-app App', () => {
  let page: MuAppPage;

  beforeEach(() => {
    page = new MuAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

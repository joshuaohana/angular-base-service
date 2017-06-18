import { AngularBaseServicePage } from './app.po';

describe('angular-base-service App', () => {
  let page: AngularBaseServicePage;

  beforeEach(() => {
    page = new AngularBaseServicePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

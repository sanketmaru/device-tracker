import { TrackerClientPage } from './app.po';

describe('tracker-client App', () => {
  let page: TrackerClientPage;

  beforeEach(() => {
    page = new TrackerClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

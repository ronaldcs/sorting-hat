import { SortingHatPage } from './app.po';

describe('sorting-hat App', () => {
  let page: SortingHatPage;

  beforeEach(() => {
    page = new SortingHatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

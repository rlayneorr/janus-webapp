import { AppPage } from './app.po';
import { browser } from 'protractor';

xdescribe('test-app App', () => {
  let page: AppPage;
  
  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Please Select One Of the Following Applications :');
  });

  it('should display Assign force button', () => {
    expect(page.getAssignForceTitleText()).toEqual('Assign Force');
  });

  it('should display Caliber button', () => {
    expect(page.getCaliberTitleText()).toEqual('Caliber');
  });

 it('should display Track Force button', () => {
    expect(page.getTrackForceTitleText()).toEqual('Track Force');
  });

  it('should click Tracforce button and go to trackfroce login in page', () => {
    page.clickTrackForceButton();
    expect(page.getTrackForceLoginTitleText()).toEqual('Track Force Login');
  });

  it('should log in to Track Force', () => {
    page.sendTrackForceLogin();
    expect(page.getTrackForceLoggedInTitleText()).toEqual('Displaying SalesForce Statistics');
  });

it('should go Client List Page', () => {
    page.goToClientListPage();
    expect(page.getClientListTitleText()).toEqual('Show Clients With No Associates');
  });

  

});

describe('test-chart', () => {
  let page: AppPage;
  
  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Please Select One Of the Following Applications :');
  });

  it('should display Track Force button', () => {
    expect(page.getTrackForceTitleText()).toEqual('Track Force');
  });

  it('should click Tracforce button and go to trackfroce login in page', () => {
    page.clickTrackForceButton();
    expect(page.getTrackForceLoginTitleText()).toEqual('Track Force Login');
  });

  it('should log in to Track Force', () => {
    page.sendTrackForceLogin();
    expect(page.getTrackForceLoggedInTitleText()).toEqual('Displaying SalesForce Statistics');
  });

  // it('should click charts',() =>{
  //   page.clickCharts();
  // })
  
});

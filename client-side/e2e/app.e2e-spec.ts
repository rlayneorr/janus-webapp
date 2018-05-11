import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('test-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
 //   expect(page.getTitleText()).toEqual('Please Select One Of the Following Applications :');
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

  it('should click Trackforce button and go to Trackforce login in page', () => {
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


it('should click first client', () => {
    page.clickFirstClient();
    expect(page.getClientListChartTitle()).toEqual('22nd Century Technologies');
  });

it('should search for a client and click result', () => {
    page.searchClientList('FINRA');
    page.clickClientListSearchResult();
    expect(page.getClientListChartTitle()).toEqual('FINRA');
});

it('should go to batch-listing', () => {
    page.goToBatchListPage();
    expect(page.getBatchListTitleText()).toEqual('All Batches');
});

it('should go to associate listing', () => {
    page.goToAssociateList();
    expect(page.getAssociatePageTitle()).toEqual('Associates');
});

it('should go to predictions page', () => {
    page.goToPredictionsPage();
    expect(page.getPredictionsPageTitle()).toEqual('Predictions');
});
  // it('should click charts',() =>{
  //   page.clickCharts();
  // })

/*  it('should scroll through client list and find a chart for each client', () => {
    var numClients = page.getNumberOfClients().then(number=>{
      for(let i = 1; i <= number; i++){
        console.log(number);
        page.clickClientAtIndex(i);
        expect(page.getClientNameAtIndex(i)).toEqual(page.getClientListChartTitle());
      }
    });*/
});

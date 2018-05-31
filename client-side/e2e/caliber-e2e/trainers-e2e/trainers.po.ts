/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */

import { browser, by, element, ElementHelper } from 'protractor';


export class TrainersPage{



    navigateTo(){
        browser.get(browser.baseUrl+'/#/Caliber/home');
    }

    clickSettings(){

        let e = element(by.xpath('//*[@id="settingsMenu"]'));
        e.click();
    }

    clickTrainerButton(){

        let e = element(by.buttonText('Trainers'));
        e.click();

    }

    

    getTrainerTable(){

        return element(by.id('trainers-table')).element(by.tagName('table'));
        

    }


    allTrainers(){

        return element(by.id('trainerList')).all(by.tagName('tr'));
    }

    clickAddButton(){

        let e = element(by.buttonText('Create Trainer'));
        return e.click();
    }

    getModal(){
        return element(by.css('.modal-content'));
    }



}
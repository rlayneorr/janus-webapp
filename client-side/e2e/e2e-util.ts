/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */


import { browser, by, element, ElementFinder } from 'protractor';

//a utility class that helps us modularize tests
export class Util{

/*
 *              Navigation Functions
 */

    //gets the base url -- defaulted to the baseUrl defined in protractor.conf
    private  baseUrl : string = browser.baseUrl;

    //beautifies the navigation process
    public navigateTo(source : string){
        return browser.get(this.baseUrl+source);
      }

      //simple getters and setters
      public getBaseUrl(){
        return this.baseUrl;
      }
      public setBaseUrl(str : string){
        this.baseUrl = str;
      }

      //appends artifacts such as '/#/' to the base url.
      public addToBase(str : string){
        this.baseUrl += str;
    }

      //resets the url to protractor.conf (the default url)
      public resetBaseUrl(){
        this.baseUrl = browser.baseUrl;
      }




/*
*              Document element manipulation/queries
*/

      //beautifies the element retrieval process
      //set 'multiple' to true if expecting a set of elements
      public get(id : string, getBy: string, type : string, multiple=false){

        let e;

        if(!multiple)
            e = this.getElement(id,getBy);
        else
            e = this.getElements(id,getBy);
        switch(type){
            //returns the element.
            case 'element':
            return e;
            
            //returns whether the element is present
            case 'isPresent':
            return e.isPresent();

            //returns whether the element is visible
            case 'isDisplayed':
            return e.isDisplayed();

            //simulates a button click on the element.
            case 'click':
            e.click();
            return;

            //returns the text of the element.
            case 'text':
            return e.getText();

            case 'count':
            return e.count();

        }

      }



      public getElement(id: string, getBy : string){

        switch(getBy){

            case 'id':
            return element(by.id(id));
            case 'css':
            return element(by.css(id));
            case 'name':
            return element(by.name(id));
            case 'xpath': 
            return element(by.xpath(id));
            case 'linkText':
            return element(by.linkText(id));
            case 'buttonText':
            return element(by.buttonText(id));
           }

      }
      public getElements(id: string, getBy : string){

        switch(getBy){
            case 'id':
            return element.all(by.id(id));
            case 'css':
            return element.all(by.css(id));
            case 'name':
            return element.all(by.name(id));
            case 'xpath': 
            return element.all(by.xpath(id));
            case 'linkText':
            return element.all(by.linkText(id));
            case 'buttonText':
            return element.all(by.buttonText(id));
    
           }

      }


}
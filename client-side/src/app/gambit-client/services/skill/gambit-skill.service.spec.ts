import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { GambitSkillService } from './gambit-skill.service';
import { UrlService } from '../urls/url.service';
import { defer } from 'rxjs/observable/defer';
import { GambitSkill } from '../../entities/GambitSkill';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

/**
   * Last modified by the Avengers
   *
   * Byron Hall | 1803-USF-MAR26 | Wezley Singleton
   *
   * Antonio Marrero Bonilla | 1803-USF-MAR26 | Wezley Singleton
   *
   */

fdescribe('GambitSkillService', () => {
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [
  //       HttpClientModule
  //     ],
  //     providers: [
  //       GambitSkillService,
  //       HttpClient
  //     ]
  //   });
  // });

  // it('should be created', inject([GambitSkillService], (service: GambitSkillService) => {
  //   expect(service).toBeTruthy();
  // }));

  let httpClientSpyOnGet: {get: jasmine.Spy};
  let gambitService: GambitSkillService;

  const skillsArray: GambitSkill[] = [new GambitSkill(), new GambitSkill()];
  skillsArray[0].isActive = true;
  skillsArray[0].skillID = 1;
  skillsArray[0].skillName = 'JSP';

  skillsArray[1].isActive = false;
  skillsArray[1].skillID = 2;
  skillsArray[1].skillName = 'servlet';

  it('findAll should return gambitskill observable', () => {
    httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
    gambitService = new GambitSkillService(<any> httpClientSpyOnGet, new UrlService);
    httpClientSpyOnGet.get.and.returnValue(asyncData(skillsArray));
    gambitService.findAll().subscribe(
      skills => expect(skills).toEqual(skillsArray)
    );
  });

  it('findAllActive should return all active gambitskills', () => {
    httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
    gambitService = new GambitSkillService(<any> httpClientSpyOnGet, new UrlService);
    httpClientSpyOnGet.get.and.returnValue(asyncData(skillsArray));
    gambitService.findAllActive().subscribe(
      skills => expect(skills).toContain(skillsArray[1])
    );
  });
});

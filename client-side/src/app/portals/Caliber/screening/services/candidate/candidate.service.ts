import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../../entities/Candidate';
import { UrlService } from '../../../../../caliber-client/services/urls/url.service';
import { AlertsService } from '../../../services/alerts.service';

/**
 * Used to obtain the collection of
 * candidates waiting to be screened,
 * set the candidate being screened,
 * and get the candidate being screened
 *
 * Modified from made endpoints more consistent with
 * the rest of the application.
 *
 * @author Alex Pich | 1803-USF-MAR26 | Wezley Singleton
 *
 * @author Danny S Chhun | 1803-USF-MAR26 | Wezley Singleton
 *
 * @author Michael Adedigba | 1803-USF-MAR26 | Wezley Singleton
 *
 * @author Pedro De Los Reyes | 1803-USF-MAR26 | Wezley Singleton
 */

@Injectable()
export class CandidateService {

  private urlService = new UrlService();
  constructor(
    private httpClient: HttpClient,
    // private urlService: UrlService,
    // private skillTypeService: SkillTypeService,
    private alertService: AlertsService
  ) { }

  selectedCandidate: Candidate;

  // Set the current selected candidate to the candidate input
  setSelectedCandidate(candidate: Candidate): void {
    this.selectedCandidate = candidate;
  }

  // Return the current selected candidate
  getSelectedCandidate(): Candidate {
    return this.selectedCandidate;
  }

  // Get an Observable array of all simple trainees.
  //  getCandidates(): Observable<Candidate[]>  {
  //   const allCandidates: Candidate[] = [];
  //   // Get array of skillTypeIds, apply random skillTypeId's to each new SimpleTrainee
  //   this.skillTypeService.getSkillTypes().subscribe(allSkillTypes => {
  //     // Get array of GAMBIT simpleTrainees, use info to build array of simpleTrainees
  //     this.httpClient.get<any[]>(this.urlService.candidate.getAll()).subscribe(allCandidates => {
  //       console.log(allCandidates);
  //       for (const e of allCandidates) {
  //         // Each simpleTrainee get random skillType
  //         const randomSkillTypeIndex = Math.floor(Math.random() * allSkillTypes.length);
  //         const thisSkillTypeId = allSkillTypes[randomSkillTypeIndex].skillTypeId;
  //         const thisSkillTypeName = allSkillTypes[randomSkillTypeIndex].skillTypeName;
  //         // Parse name into first and last name
  //         const nameArray = e.name.split(' ');
  //         let thisLastName = '';
  //         let thisFirstName = '';
  //         let i = 0;
  //         let commaFound = false;
  //         for (const n of nameArray) {
  //           if (n.charAt(n.length - 1) === ',') {
  //             commaFound = true;
  //             for (let j = 0; j <= i; j++) {
  //               // Add spaces between multiple lastnames
  //               thisLastName += nameArray[j] + ' ';
  //             }
  //             // Remove last space, and comma
  //             thisLastName = thisLastName.trim();
  //             thisLastName = thisLastName.substring(0, thisLastName.length - 1);
  //             for (let j = i + 1; j <= nameArray.length - 1; j++) {
  //               thisFirstName += nameArray[j] + ' ';
  //             }
  //             thisFirstName = thisFirstName.trim();
  //           }
  //           i++;
  //         }
  //         if (!commaFound) {
  //           thisFirstName = nameArray[0];
  //           for (i = 1; i < nameArray.length; i++) {
  //             thisLastName += nameArray[i] + ' ';
  //           }
  //           thisLastName = thisLastName.trim();
  //         }

  //         allCandidates.push({
  //           traineeID: e.traineeId,
  //           firstname: thisFirstName,
  //           lastname: thisLastName,
  //           skillTypeID: thisSkillTypeId,
  //           skillTypeName: thisSkillTypeName,
  //           schedule: new Date()
  //         });
  //       }
  //     });
  //   });

  //   return of(allCandidates);
  // }

  getCandidates() : Observable<Candidate[]>
  {
    const url = this.urlService.candidate.getAll();
    return this.httpClient.get<Candidate[]>(url);
  }

  getCandidate(candidate: Candidate) {
    const url = this.urlService.candidate.getById(candidate.candidateId);
    return this.httpClient.get<Candidate>(url);
  }

  updateCandidate(candidate : Candidate)
  {
    const url = this.urlService.candidate.create();
    return this.httpClient.put<Candidate>(url, JSON.stringify(candidate));
  }

  createCandidate(candidate : Candidate)
  {
    const url = this.urlService.candidate.create();
    return this.httpClient.post<Candidate>(url, JSON.stringify(candidate));
  }

  deleteCandidate(candidate : Candidate){
    const url = this.urlService.candidate.delete(candidate.candidateId);
    return this.httpClient.delete<Candidate>(url);
  }

}

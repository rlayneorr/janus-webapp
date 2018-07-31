import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../../entities/Candidate';
import { UrlService } from '../../../../../gambit-client/services/urls/url.service';
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
    // private alertService: AlertsService
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

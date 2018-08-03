import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../../../gambit-client/services/urls/url.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SkillsetService {
    url = (new UrlService).context;
    MOCK_API   = 'https://9a03ee58-6ed8-4d7b-8df1-60f505a77580.mock.pstmn.io/';
    NO_BACKEND = false;
    private curriculumPath = 'TrackForce/skillset';

    /**
      *@param {HttpClient} http
      *Need to create a connection to REST endpoint
      *And initiate Http requests
      */
    constructor(private http: HttpClient) {}

    /**
      *Get skill set info from the back-end
      *
      *@param {number} statusID
      *id of the skillset
      *
       @param {RequestService}
      *@return skillset data based on id
      */
    getSkillsetsForStatusID(statusID: number): Observable<any> {
        return this.http.get(((this.NO_BACKEND) ? this.MOCK_API : this.url) +
            'TrackForce/api/associates/unmapped/' + statusID);
    }

    public getAllCurricula(): Observable<any> {
      return this.http.get<any>(this.url + this.curriculumPath);
    }

}

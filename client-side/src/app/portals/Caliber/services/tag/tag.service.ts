// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// // import { Tag } from '../../screening/entities/tag';
// import { TAGS } from '../../screening/mock-data/mock-tags';
// import { UrlService } from '../../../../caliber-client/services/urls/url.service';

// /**
// * Used to get the Tags that are shown to the screener
// * in the first phase of the interview.
// *
// * The screener will be presented with the list of all tags in the system,
// * select one or more tags, and then the tags
// * are sent to the server to generate the question buckets.
// *
// * Tag is a very ephemeral entity, used for only a brief time
// *
// * @author Alex Pich | 1803-USF-MAR26 | Wezley Singleton
// *
// * @author Danny S Chhun | 1803-USF-MAR26 | Wezley Singleton
// *
// * @author Michael Adedigba | 1803-USF-MAR26 | Wezley Singleton
// *
// * @author Pedro De Los Reyes | 1803-USF-MAR26 | Wezley Singleton
// *
// * Removed UrlUtilService and replaced with UrlService for better
// * formatted endpoints
// */

// @Injectable()
// export class TagService {

//   constructor(
//     private http: HttpClient,
//     private urlService: UrlService
//   ) { }

//   public tagListChecked: Tag[] = [];

//   getAllTags(): Observable<Tag[]> {
//     return this.http.get<Tag[]>(
//       this.urlService.tags.getAllTags(), {}
//     );
//   }
//   // Fake local data for temp use
//   /*getAllTags(): Observable<Tag[]>{
//     return of(TAGS);
//   }*/

//   getCheckedTags(): Tag[] {
//     return this.tagListChecked;
//   }
// }

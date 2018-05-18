import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { GambitSkillService } from './gambit-skill.service';

xdescribe('GambitSkillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        GambitSkillService,
        HttpClient
      ]
    });
  });

  it('should be created', inject([GambitSkillService], (service: GambitSkillService) => {
    expect(service).toBeTruthy();
  }));
});

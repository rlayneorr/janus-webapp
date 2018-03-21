import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BamUser } from '../../portals/Bam/models/bamuser.model';
import { SessionService } from '../../portals/Bam/services/session.service';
import { UsersService } from '../../portals/Bam/services/users.service';

/**
 * Displays the current user's name within the navbar,
 * and displays the appropriate title depending on the user's
 * roleId.
 * @author Allan Poindexter - 1712_dec11th_java_steve
 */
@Component({
  selector: 'app-bam-nav',
  templateUrl: './bam-nav.component.html',
  styleUrls: ['./bam-nav.component.css'],
  providers: [SessionService, UsersService]
})
export class BamNavComponent implements OnInit {

  @Input() collapsed: boolean;
  @Output() collapse: EventEmitter<any> = new EventEmitter<any>();

  bamUser: BamUser;
  roleTitle: string;

  constructor(private sessionService: SessionService) {
    this.bamUser = sessionService.bamUser;
  }

  /**
   * On initialize, show the user's role.
   */
  ngOnInit() {
    switch (this.bamUser.role) {
        case 1:
          this.roleTitle = 'Associate';
          break;
        case 2:
          this.roleTitle = 'Trainer';
          break;
        case 3:
          this.roleTitle = 'Quality Control';
          break;
    }
  }

  /**
   * Hide the dropdown tab when the user clicks a link.
   */
  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.collapse.emit(this.collapsed);
  }
}

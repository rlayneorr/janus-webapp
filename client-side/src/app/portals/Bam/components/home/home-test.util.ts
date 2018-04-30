import { BamUser } from '../../models/bamuser.model';

export class HomeUtil {
    static getUserById(id: number): BamUser {
        const user: BamUser = new BamUser(id, '', '', '', '',
            '' , 0, null, '', '', '', '', 0);
        return user;
  }
}

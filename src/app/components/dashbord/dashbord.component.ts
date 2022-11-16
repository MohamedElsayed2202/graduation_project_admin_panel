import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit, OnDestroy{
  mobileQuery: MediaQueryList;
  pageTitle: string = 'Students';
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private userServic: UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change',this._mobileQueryListener);
  }

  logout(): void{
    this.userServic.logout();
  }

  ngOnInit(): void {
  }

  changeTitle(title: string):void{
    this.pageTitle = title;
  }
}

@Component({
  selector: 'delete.confirmation',
  templateUrl: './delete.confirmation.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DeleteDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}){}
}

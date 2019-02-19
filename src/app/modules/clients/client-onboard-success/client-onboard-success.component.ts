import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'anms-client-onboard-success',
  templateUrl: './client-onboard-success.component.html',
  styleUrls: ['./client-onboard-success.component.scss']
})
export class ClientOnboardSuccessComponent implements OnInit {

  sub: any;
  parentRouteId:any;
  statusForUpdate = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = params["id"];
    });
  }

  handleRoutingClick(name){
    if(name == 'editContract'){
      this.router.navigate(['home/tenants/tenant/' + this.parentRouteId + '/contract']);
    }
    if(name == 'editAccount'){
      this.router.navigate(['home/tenants/tenant/' + this.parentRouteId + '/admin-account']);
    }
    if(name == 'createClient'){
      this.router.navigate(['home/tenants/tenant/' + this.parentRouteId + '/home']);
    }
    if(name == 'home'){
      this.router.navigate(['home/tenants/tenants-welcome']);
    }
  }

  proceedToSetupOrgTree(){
    this.gotoOrgTree();
  }

  gotoOrgTree() {
    this.router.navigate(['/home/business/hospital-info/' + this.parentRouteId]);
  }


}

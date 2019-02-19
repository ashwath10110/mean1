
export const PartnerUtils = {
  isApprover: isApprover,
  getRoles: getRoles,
  getPartnerTypesList: getPartnerTypesList,
  createHospitalUnit: createHospitalUnit,
  createApprovalComments: createApprovalComments
}



 export function isApprover(route) {
    let routeName: string;
    if(route){
        route.parent.parent.url.subscribe(url => {
            routeName = url[0].path;
          });
     return (routeName === 'unit-approve')
    } else {
        return false;
    }
}

 function getRoles(){
    return [
      {
        value: 'VIEWER',
        displayValue: 'Viewer'
      },
      {
        value: 'ASSOCIATE',
        displayValue: 'Associate'
      }
    ]
  };

  export function getPartnerTypesList() {
    return  [
      {
        value: 'AGENT',
        displayValue: 'Agent'
      },
      {
        value: 'FACILITATOR',
        displayValue: 'Facilitator'
      },
      {
        value: 'REFERRAL_DOCTOR',
        displayValue: 'Referral Doctor'
      },{
        value: 'CLINICS',
        displayValue: 'Clinics'
      },{
        value: 'HMO',
        displayValue: 'HMO'
      }
    ];
  }

  export function createHospitalUnit(data) {
    let unit = {
      value: data.id,
      displayValue: (data.name) ? data.name: '',
    };
    return unit;
  };

  export function createApprovalComments(formControls, currentApproval, existingData, newData){
    const approvalComments = {};
    if (currentApproval.method.toLowerCase() == 'post') {

    }
    else if (currentApproval.method.toLowerCase() == 'put') {
      Object.keys(formControls).forEach((fieldName) => {
        if (existingData[fieldName] != newData[fieldName]) {
          approvalComments[fieldName] = existingData[fieldName] + " -> " + newData[fieldName];
        }
      });
    }
    return approvalComments;
  }

  

export interface ClientOnboardingState {
  clientData: clientData,
  contacts: any;
  contract: clientContract,
  finance: clientFinance,
  hosting: clientHosting,
  info: clientInfo,

  loading: boolean,
  isLoaded: boolean,
  errorMessage: any;
}

export interface clientData {
  name: string;
  description: string;
  tenantType: string;
  statusForUpdate: string;
  isLoaded: boolean;
  isInitialised: boolean;
  errorMessage: any;
}

export interface clientContract {
  contractStartDate: string;
  contractEndDate: string;
  clientType: string;
  noOfLeads: string;
  domain: string;
  attachments: any;
  statusForUpdate: string;
  isLoaded: boolean;
  isInitialised: boolean;
  errorMessage: any;
}

export interface clientFinance {
  bankingType?: string;
  accountType?: string;
  accountNo?: string;
  bankName?: string;
  branchName?: string;
  currency?: string;
  ifscCode?: string;
  ownerName?: string;
  swiftCode?: string;
  micr?: string;
  statusForUpdate: string;
  isLoaded: boolean;
  isInitialised: boolean;
  errorMessage: any;
}

export interface clientHosting {
  host: string;
  port: string;
  username: string;
  password: string;
  statusForUpdate: string;
  isLoaded: boolean;
  isInitialised: boolean;
  errorMessage: any;
}

export interface clientInfo {
  cin: string;
  licenseNum: string;
  phone: string;
  fax: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  statusForUpdate: string;
  isLoaded: boolean;
  isInitialised: boolean;
  errorMessage: any;
}

export const SameServerConfig = {
  mbid: "",
  name: "",
  description: "",
  tenantType: "",
  ownerEmail: "",
  ownerName: "",
  active: "",
  tenantId: "",
  host: "",
  port: "",
  username: "",
  password: ""
}

export interface TenantUiObject {
  tenantMetaData: TenantMetaData,
  tenantData: TenantData
}

export interface TenantMetaData {
  active: boolean;
  tenantId: string;
  host: string;
  port: Number;
  username: string;
  password: string;
}

export interface TenantData {
  init: boolean;
  mbid: string;
  name: string;
  tenantId: string;
  description: string;
  tenantType: string;
  ownerEmail: string;
  ownerName: string;
}

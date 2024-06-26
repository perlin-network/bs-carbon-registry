export enum ProgrammeStage {
  AWAITING_DESIGN = 'AwaitingDesign',
  AWAITING_VALIDATION = 'AwaitingValidation',
  AWAITING_VERIFICATION = 'AwaitingVerification', // Up to this not used
  AWAITING_AUTHORIZATION = 'AwaitingAuthorization',
  AUTHORISED = 'Authorised',
  REJECTED = 'Rejected',
  RETIRED = 'Retired',
  TRANSFERRED = 'Transferred',
}

export enum ProgrammeStageLegend { // Up to this not used
  AUTHORISED = 'Authorised',
  REJECTED = 'Rejected',
  AWAITING_AUTHORIZATION = 'AwaitingAuthorization',
}

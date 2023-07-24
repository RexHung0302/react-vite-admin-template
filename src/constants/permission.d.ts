type CRUDType = 'C' | 'R' | 'U' | 'D';

export interface IPermission {
  [key: string]: CRUDType[];
}

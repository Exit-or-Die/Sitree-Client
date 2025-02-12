export type AffiliationType = 'UNIVERSITY' | 'HIGH_SCHOOL' | 'CORPORATION';

export type ExtendedAffiliationType = 'ALL' | AffiliationType;

export interface CategoryType {
  label: string;
  type: ExtendedAffiliationType;
}

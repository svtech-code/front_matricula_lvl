import type { FamiliarApiResponse } from './familiar.entity';

export interface FamiliarRepository {
  getFamiliar(run_familiar: number): Promise<FamiliarApiResponse>;
}

import { z } from 'zod';

export const verifyRutSchema = z.object({
  rut: z
    .string()
    .min(7, 'El RUT debe tener al menos 7 dígitos')
    .max(9, 'El RUT debe tener máximo 9 dígitos')
    .regex(/^\d+$/, 'El RUT solo debe contener números'),
});

export type VerifyRutFormData = z.infer<typeof verifyRutSchema>;

export interface VerifyRutFormProps {
  onSubmit: (rut: number, dv: string) => void;
  isLoading?: boolean;
}

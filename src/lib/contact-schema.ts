import { z } from 'zod';

const serviceValues = [
  'mantenimiento', 'montaje', 'puesta-en-marcha',
  'alineacion', 'asesoria', 'suministros', 'integral', 'otro',
] as const;

const plantValues = ['hidro', 'vapor', 'gas', 'mixta', 'otra'] as const;

export function createContactSchema(msgs?: {
  required?: string;
  email?: string;
  minMessage?: string;
}) {
  const req = msgs?.required ?? 'This field is required';
  const eml = msgs?.email ?? 'Please enter a valid email address';
  const min = msgs?.minMessage ?? 'Please describe your needs (minimum 20 characters)';

  return z.object({
    fullName:    z.string().min(2, req),
    company:     z.string().min(2, req),
    position:    z.string().optional(),
    email:       z.email({ message: eml }),
    phone:       z.string().optional(),
    country:     z.string().min(2, req),
    serviceType: z.enum(serviceValues, { message: req }),
    plantType:   z.enum(plantValues,   { message: req }),
    message:     z.string().min(20, min),
  });
}

export const contactFormSchema = createContactSchema();
export type ContactFormData = z.infer<typeof contactFormSchema>;

import { z } from "zod";

export const leadFormSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .regex(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras permitidas"),
  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .regex(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras permitidas"),
  email: z.string().email("Email inválido"),
  dni: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{7,8}$/.test(val),
      "El DNI debe tener 7 u 8 dígitos"
    ),
  cbx_carrera: z.string().min(1, "Seleccioná una carrera"),
  cbx_provincia: z.string().min(1, "Seleccioná una provincia"),
  cbx_sede: z.string().min(1, "Seleccioná una sede"),
  ddi_pais: z.string().min(1, "Seleccioná el código de país"),
  cod_area: z
    .string()
    .min(2, "Ingresá el código de área")
    .max(4, "Máximo 4 dígitos"),
  tel: z
    .string()
    .min(6, "Ingresá el número de teléfono")
    .max(8, "Máximo 8 dígitos"),
  tipo_tel: z.string().default("cel"),
  utm_source: z.string().optional().default(""),
  utm_medium: z.string().optional().default(""),
  utm_term: z.string().optional().default(""),
  utm_content: z.string().optional().default(""),
  utm_campaign: z.string().optional().default(""),
  idconversion: z.string().optional().default(""),
  campaignid: z.string().optional().default(""),
  referer: z.string().optional().default(""),
  gclid: z.string().optional().default(""),
  id_origen: z.string().default("103"),
  modo: z.string().default("7"),
  tabla: z.string().default("postulantes"),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

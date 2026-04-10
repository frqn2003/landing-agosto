import { z } from "zod";

export const formSchema = z.object({
  /* Datos personales */
  nombre: z.string().min(2, "Requerido").regex(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras"),
  email: z.email("Email inválido"),
  cod_area: z.string().min(2, "Mínimo 2 dígitos").max(4, "Máximo 4 dígitos").regex(/^\d+$/, "Solo números"),
  tel: z.string().min(6, "Mínimo 6 dígitos").max(8, "Máximo 8 dígitos").regex(/^\d+$/, "Solo números"),
  ddi_pais: z.string().default("54"),
  tipo_tel: z.string().default("cel"),

  /* Datos de carreras */
  cbx_carrera: z.string().min(1, "Seleccioná una carrera"),
  cbx_modo: z.string().min(1, "Seleccioná una modalidad"),
  cbx_provincia: z.string().min(1, "Seleccioná una provincia"),
  cbx_sede: z.string().min(1, "Seleccioná una sede"),
});

export type FormData = z.infer<typeof formSchema>;

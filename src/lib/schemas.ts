import { z } from 'zod';

export const planFormSchema = z.object({
  name: z.string().min(3, { message: "Nome completo é obrigatório e deve ter no mínimo 3 caracteres." }),
  phone: z.string().min(10, { message: "Telefone é obrigatório (com DDD)." }).regex(/^[1-9]{2}9?[0-9]{8}$/, { message: "Formato de telefone inválido." }),
  email: z.string().email({ message: "Formato de e-mail inválido." }).optional().or(z.literal('')),
  propertyType: z.string().min(1, { message: "Por favor, selecione o tipo de imóvel." }),
  securityPriority: z.string().min(1, { message: "Por favor, selecione o nível de prioridade." }),
});

export type PlanFormData = z.infer<typeof planFormSchema>;

export const quizFormSchema = z.object({
  cameras: z.string().min(1, { message: "Resposta obrigatória." }),
  alarmSystem: z.string().min(1, { message: "Resposta obrigatória." }),
  mainConcern: z.string().min(1, { message: "Resposta obrigatória." }),
});

export type QuizFormData = z.infer<typeof quizFormSchema>;

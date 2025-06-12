"use server";
import { generateSmartSecurityTips, type GenerateSmartSecurityTipsInput } from '@/ai/flows/generate-smart-security-tips';
import type { PlanFormData } from '@/lib/schemas';

export async function submitUserDataAndGetTips(
  planData: PlanFormData,
  quizAnswers: Record<string, string>
) {
  // Simulate saving lead data
  console.log('Lead data received:');
  console.log('Name:', planData.name);
  console.log('Phone:', planData.phone);
  console.log('Email:', planData.email);
  console.log('Property Type:', planData.propertyType);
  console.log('Security Priority:', planData.securityPriority);
  console.log('Quiz Answers:', quizAnswers);

  const combinedAnswers = {
    ...quizAnswers,
    'Tipo de Imóvel': planData.propertyType,
    'Prioridade de Segurança': planData.securityPriority,
  };

  const aiInput: GenerateSmartSecurityTipsInput = {
    quizAnswers: combinedAnswers,
  };

  try {
    const result = await generateSmartSecurityTips(aiInput);
    if (result && result.securityTips) {
      return { success: true, tips: result.securityTips, error: null };
    }
    // Handle case where result or securityTips might be undefined/null from AI
    console.error("AI result format unexpected:", result);
    return { success: false, tips: null, error: "Não foi possível gerar as dicas personalizadas no momento. Tente novamente mais tarde." };

  } catch (error) {
    console.error("Error generating security tips:", error);
    // Check if error is an object and has a message property
    const errorMessage = (typeof error === 'object' && error !== null && 'message' in error) ? String(error.message) : "Erro desconhecido ao gerar dicas.";
    return { success: false, tips: null, error: `Falha ao gerar dicas: ${errorMessage}` };
  }
}

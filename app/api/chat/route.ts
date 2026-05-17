import { google } from '@ai-sdk/google'
import { streamText, convertToModelMessages } from 'ai'
import { getBrandContext } from '@/lib/brand-context'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const brandContext = await getBrandContext()

  const system = `Você é a inteligência de marca da Bhumi Athleisure & Wellness — uma assistente especializada no brand system completo da marca.

Seu papel é responder perguntas, ajudar a planejar ações, criar textos no tom certo, orientar decisões visuais e verbais, e ser uma referência viva da marca para a fundadora e a equipe.

Diretrizes de resposta:
- Responda sempre em português brasileiro
- Seja elegante, objetiva e próxima — como a própria marca
- Quando relevante, mencione em qual seção das diretrizes o usuário pode aprofundar
- Não invente informações que não estejam no brand system
- Mantenha o vocabulário e tom de voz da Bhumi nas suas respostas

=== BRAND SYSTEM DA BHUMI ===

${brandContext}

=== FIM DAS DIRETRIZES ===`

  const modelMessages = await convertToModelMessages(messages)

  const result = streamText({
    model: google('gemma-4-31b-it'),
    system,
    messages: modelMessages,
  })

  return result.toUIMessageStreamResponse()
}

// Output Token limits for each model
export const minimumTokens = 4096

/**
 * OpenAI
 * https://platform.openai.com/docs/models
 *
 * maxTokens = input + output https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/chatgpt?tabs=python-new#manage-conversations
 */
const openAIModels = {
  'gpt-3.5-turbo-0125': 16385 / 2,
  'gpt-3.5-turbo': 16385 / 2,
  'gpt-3.5-turbo-1106': 16385 / 2,
  'gpt-3.5-turbo-instruct': 4096 / 2,
  'gpt-3.5-turbo-16k': 16385 / 2,
  'gpt-3.5-turbo-0613': 4096 / 2,
  'gpt-3.5-turbo-16k-0613': 16385 / 2,
  'gpt-4o': 128000 / 2,
  'gpt-4-turbo': 128000 / 2,
  'gpt-4-turbo-2024-04-09': 128000 / 2,
  'gpt-4-turbo-preview': 128000 / 2,
  'gpt-4-0125-preview': 128000 / 2,
  'gpt-4-1106-preview': 128000 / 2,
  'gpt-4-vision-preview': 128000 / 2,
  'gpt-4-1106-vision-preview': 128000 / 2,
  'gpt-4': 8192 / 2,
  'gpt-4-0613': 8192 / 2,
  'gpt-4-32k': 32768 / 2,
  'gpt-4-32k-0613': 32768 / 2,
}

export const modelTokens = {
  ...openAIModels,
}

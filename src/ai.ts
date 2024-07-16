import { CoreMessage, generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { createAzure } from '@ai-sdk/azure'
import { minimumTokens, modelTokens } from './models'
import { error, getInput, info } from '@actions/core'
import { encode } from 'gpt-3-encoder'
import { SYSTEM_PROMPT } from './prompt'

const apiKey = getInput('apikey', { required: true })
const provider = getInput('provider', { required: true }) as 'openai' | 'azure'
const baseURL = getInput('baseURL')

class AI {
  private readonly provider: any
  private readonly model: string
  private prompt: string

  constructor(providerName: string, apiKey: string, baseURL?: string) {
    this.provider = this.createProvider(providerName, apiKey, baseURL)
    this.model = getInput('model', { required: true })
    this.prompt = getInput('prompt', { required: true })
  }

  private createProvider(
    providerName: string,
    apiKey: string,
    baseURL?: string,
  ) {
    const providerInitializers = {
      openai: createOpenAI,
      azure: createAzure,
    }

    const initializer = providerInitializers[providerName]
    if (!initializer) {
      throw new Error(`Provider ${providerName} is not supported.`)
    }

    const baseOptions = { apiKey }
    if (baseURL) {
      baseOptions['baseURL'] = baseURL
    }
    return initializer(baseOptions)
  }

  private async generateTextRequest(text: string): Promise<string> {
    const messages: CoreMessage[] = [
      { role: 'user', content: `${text}` },
    ]

    messages.unshift({ role: 'system', content: SYSTEM_PROMPT })

    const response = await generateText({
      model: this.provider(this.model),
      messages: messages,
    }).catch((err) => {
      error(err)
      process.exit(1)
    })
    if (!response.text) {
      throw new Error('Error: Could not retrieve content from AI.')
    }

    return response.text
  }

  public async translate(
    text: string,
    targetFileExt: string,
    splitter = '\n\n',
  ): Promise<string> {
    const maxToken =
      (modelTokens[this.model] || minimumTokens) /
      2
    this.prompt = this.prompt
      .replaceAll('{targetFileExt}', targetFileExt)

    let translated = ''
    let chunk = ''

    info(
      `${new Date().toLocaleString()} Start translating with ${this.model}...`,
    )
    const contentChunks = text.split(splitter)

    for (let i = 0; i < contentChunks.length; i++) {
      if (encode(chunk + contentChunks[i]).length > maxToken) {
        const translatedContent = await this.generateTextRequest(chunk)
        translated += translatedContent + splitter
        chunk = ''
      }
      chunk += contentChunks[i] + (i < contentChunks.length - 1 ? splitter : '')
    }

    translated += await this.generateTextRequest(chunk)
    info('Translation completed!')

    return translated
  }
}

const translator = new AI(provider, apiKey, baseURL)
export default translator

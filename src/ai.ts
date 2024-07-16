import { CoreMessage, generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { createAzure } from '@ai-sdk/azure'
import { error, getInput, info } from '@actions/core'
import { SYSTEM_PROMPT } from './prompt'

const apiKey = getInput('apikey', { required: true })
const provider = getInput('provider', { required: true }) as 'openai' | 'azure'
const baseURL = getInput('baseURL')
const resourceName = getInput('resourceName')

class AI {
  private readonly provider: any
  private readonly model: string

  constructor(providerName: string, apiKey: string, baseURL?: string) {
    this.provider = this.createProvider(providerName, apiKey, baseURL)
    this.model = getInput('model', { required: true })
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
    if (providerName === 'azure') {
      baseOptions['resourceName'] = resourceName
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
  ): Promise<string> {

    info(
      `${new Date().toLocaleString()} Start translating with ${this.model}...`,
    )

    const response = await this.generateTextRequest(text)
    info('Translation completed!')

    return response
  }
}

const translator = new AI(provider, apiKey, baseURL)
export default translator

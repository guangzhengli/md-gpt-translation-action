# Markdown GPT Translation

```yml
inputs:
  token:
    description: 'GITHUB_TOKEN or a `repo` scoped Personal Access Token (PAT)'
    default: ${{ github.token }}
  apikey:
    description: 'API Key'
    required: true
  provider:
    description: 'AI Provider'
    required: false
    default: 'openai'
  model:
    description: 'The language model to use.'
    required: false
    default: 'gpt-4o'
  basePath:
    description: 'Replace the base path of openai api'
    required: false
```

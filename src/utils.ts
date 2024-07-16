import { setFailed } from '@actions/core'
import { gitPostComment } from './git'

export const postError = async (message: string) => {
  await gitPostComment(`❌${message}`)
  setFailed(message)
  process.exit(1)
}

export const removeSymbols = (input: string): string => {
  return input.replace(/[^\w\s]/gi, '')
}


export const generatePRBody = (
  inputFilePath: string,
  outputFilePath: string,
  issueNumber?: number,
) => {
  return `## ✅ LLM Translation completed
  |**Name**|**Value**|
  |---|---|
  Source', inputFilePaths: ${inputFilePath}
  Output', outputFilePath: ${outputFilePath}
  ${issueNumber ? `|**Issue**|#${issueNumber}|` : ''}
  `
}

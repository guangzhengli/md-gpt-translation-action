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
  inputFilePaths: string[],
  outputFilePaths: string[] | string[][],
  issueNumber?: number,
) => {
  const generateRow = (label: string, filePaths: string[] | string[][]) => {
    let result: string[] = []

    if (Array.isArray(filePaths[0])) {
      let cnt = -1
      filePaths.forEach((subArr) => {
        subArr.forEach((filePath: string) => {
          cnt++
          return result.push(
            `${cnt > 0 ? '|' : `|**${label}**`}|\`${filePath}\`|`,
          )
        })
      })
    } else {
      filePaths.forEach((filePath, i) => {
        return result.push(`${i > 0 ? '|' : `|**${label}**`}|\`${filePath}\`|`)
      })
    }
    return result.join('\n')
  }

  return `## ✅ LLM Translation completed
  |**Name**|**Value**|
  |---|---|
  ${generateRow('Source', inputFilePaths)}
  ${generateRow('Output', outputFilePaths)}
  ${issueNumber ? `|**Issue**|#${issueNumber}|` : ''}
  `
}

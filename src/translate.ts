import { context } from '@actions/github'
import { generatePRBody } from './utils'
import { gitCommitPush, gitCreateBranch, gitCreatePullRequest, gitPostComment, gitSetConfig } from './git'
import { createFile, generateOutputFilePath, isFileExists } from './file'
import fs from 'fs/promises'
import translator from './ai'
import { info } from '@actions/core'

export const saveTranslateFiles = async (
  inputFilePath: string,
  outputFilePath: string,
) => {
    const content = await fs.readFile(inputFilePath, 'utf-8')
    const translated = await translator.translate(content)

    if (await isFileExists(outputFilePath)) {
      const fileContent = await fs.readFile(outputFilePath, 'utf-8')
      if (fileContent === translated) {
        info(
          '⛔ The result of translation was same as the existed output file.',
        )
        return
      }
    }

    info(`Create Translated File ${outputFilePath}`)
    await createFile(translated, outputFilePath)
}

export const translateByCommand = async (
  inputFilePath: string,
  outputFilePath: string,
) => {
  await gitSetConfig()
  const branch = await gitCreateBranch()

  const outputFilePaths = generateOutputFilePath(
    inputFilePath,
    outputFilePath,
  )

  await saveTranslateFiles(inputFilePath, outputFilePaths)

  await gitCommitPush(branch, outputFilePaths)

  const issueNumber = context.issue.number
  const title = '🌐 Add LLM Translations'
  const body = generatePRBody(
    inputFilePath,
    outputFilePaths,
    issueNumber,
  )

  await gitCreatePullRequest(branch, title, body)
  await gitPostComment('🎉Translation PR created!')
}


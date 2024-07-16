import { glob } from 'glob'
import { context } from '@actions/github'
import { generatePRBody } from './utils'
import { gitCheckout, gitCommitPush, gitCreatePullRequest, gitPostComment, gitSetConfig } from './git'
import { createFile, generateOutputFilePaths, isFileExists } from './file'
import fs from 'fs/promises'
import path from 'path'
import translator from './ai'
import { info } from '@actions/core'

export const saveTranslateFiles = async (
  inputFilePaths: string[],
  outputFilePaths: string[],
) => {
  const processFiles = inputFilePaths.map(async (inputFile, i) => {
    const content = await fs.readFile(inputFile, 'utf-8')
    const ext = path.extname(inputFile)
    const translated = await translator.translate(content, ext)

    if (await isFileExists(outputFilePaths[i])) {
      const fileContent = await fs.readFile(outputFilePaths[i], 'utf-8')
      if (fileContent === translated) {
        info(
          '⛔ The result of translation was same as the existed output file.',
        )
        return
      }
    }

    info(`Create Translated File ${outputFilePaths[i]}`)
    await createFile(translated, outputFilePaths[i])
  })

  await Promise.all(processFiles)
}

export const translateByCommand = async (
  inputFilePath: string,
  outputFilePath: string,
) => {
  await gitSetConfig()
  const branch = await gitCheckout();

  const inputFilePaths = await glob(inputFilePath)
  if (inputFilePaths.length === 0) {
    throw new Error('No input files found.')
  }

  const outputFilePaths = generateOutputFilePaths(
    inputFilePaths,
    outputFilePath,
  )

  await saveTranslateFiles(inputFilePaths, outputFilePaths)

  await gitCommitPush(branch, outputFilePaths)

  const issueNumber = context.issue.number
  const title = '🌐 Add LLM Translations'
  const body = generatePRBody(
    inputFilePaths,
    outputFilePaths,
    issueNumber,
  )

  await gitCreatePullRequest(branch, title, body)
  await gitPostComment('🎉Translation PR created!')
}


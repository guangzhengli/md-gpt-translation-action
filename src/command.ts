import { setFailed } from '@actions/core'
import { context } from '@actions/github'
import { postError } from './utils'

type CommandParams = {
  inputFilePath: string
  outputFilePath: string
}

export const getCommandParams = async (): Promise<CommandParams> => {
  const comment = context.payload.comment?.body
  if (!comment) setFailed('Error: Comment could not be retrieved correctly.')

  const regex = /translate\s+(\S+)\s+(\S+)/
  const match = regex.exec(comment)

  return commandValidator(match)
}

const isValidFileExt = (filename: string): boolean => {
  return filename.endsWith('md') || filename.endsWith('mdx');
}

const commandValidator = async (
  match: RegExpExecArray | null,
): Promise<{
  inputFilePath: string
  outputFilePath: string
}> => {
  if (!match) {
    await postError(`Invalid command`)
  }

  const [, inputFilePath, outputFilePath] = match!

  if (!isValidFileExt(inputFilePath) || !isValidFileExt(outputFilePath)) {
    await postError(`Unsupported file extension. Please use one of the following formats`)
  }

  return {
    inputFilePath,
    outputFilePath,
  }
}

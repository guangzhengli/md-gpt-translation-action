import fs from 'fs/promises'
import path from 'path'

export const createFile = async (
  data: string,
  filePath: string,
): Promise<void> => {
  try {
    await fs.writeFile(filePath, data)
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      await fs.mkdir(path.dirname(filePath), { recursive: true })
      await createFile(data, filePath)
    } else {
      throw err
    }
  }
}

export const isFileExists = async (inputPath: string) => {
  try {
    await fs.stat(inputPath)
    return true
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return false
    }
    throw error
  }
}

const replaceWildcardPath = (
  inputArray: string[],
  outputArray: string[],
): string[] => {
  const indexOfAsteriskAsterisk = outputArray.indexOf('**')
  if (indexOfAsteriskAsterisk === -1) return [...outputArray]

  return [
    ...outputArray.slice(0, indexOfAsteriskAsterisk),
    ...inputArray.slice(indexOfAsteriskAsterisk),
  ]
}

const replaceWildcardFilename = (
  inputFilenameWithoutExt: string,
  outputFilenameWithoutExt: string,
): string => {
  if (!inputFilenameWithoutExt.includes('.')) {
    return outputFilenameWithoutExt.replace('*', inputFilenameWithoutExt)
  }

  const inputSegmentsReversed = inputFilenameWithoutExt.split('.').reverse()
  const outputSegmentsReversed = outputFilenameWithoutExt.split('.').reverse()

  const wildcardIndex = outputSegmentsReversed.indexOf('*')

  const mergedSegments = [
    ...outputSegmentsReversed.slice(0, wildcardIndex),
    ...inputSegmentsReversed.slice(wildcardIndex),
  ]
  return mergedSegments.reverse().join('.')
}

export const generateOutputFilePath = (
  inputFilePath: string,
  outputFilePath: string,
): string => {
  const outputSegments = path.normalize(outputFilePath).split(path.sep)
  const outputFileName = outputSegments.pop()!

  const outputFilenameWithoutExt = path.basename(
    outputFileName,
    path.extname(outputFileName),
  )

  const generateOutputPath = (inputFilePath: string): string => {
    const inputSegments = path.normalize(inputFilePath).split(path.sep)
    const inputFile = inputSegments.pop()!
    const inputFileExt = path.extname(inputFile)
    const inputFilenameWithoutExt = path.basename(inputFile, inputFileExt)

    const resolvedPathSegments = replaceWildcardPath(
      inputSegments,
      outputSegments,
    )

    if (outputFilenameWithoutExt.includes('*')) {
      const finalFilename = replaceWildcardFilename(
        inputFilenameWithoutExt,
        outputFilenameWithoutExt,
      )

      resolvedPathSegments.push(`${finalFilename}${inputFileExt}`)
    } else {
      resolvedPathSegments.push(outputFileName)
    }

    return path.join(...resolvedPathSegments)
  }

  return generateOutputPath(inputFilePath);
}

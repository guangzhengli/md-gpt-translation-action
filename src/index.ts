import { context } from '@actions/github'
import { setFailed } from '@actions/core'
import { postError } from './utils'
import { translateByCommand } from './translate'
import { authorizeUser, gitAddCommentReaction } from './git'
import { getCommandParams } from './command'

async function main() {
  switch (context.eventName) {
    case 'issue_comment':
      const isAuthorized = await authorizeUser()
      if (!isAuthorized) {
        await postError('You have no permission to use this bot.')
      }
      await gitAddCommentReaction('eyes')
      const { inputFilePath, outputFilePath } = await getCommandParams()
      await translateByCommand(inputFilePath, outputFilePath)
      break
    default:
      throw new Error('This event is not supported.')
  }
}

main().catch((e) => setFailed(e))

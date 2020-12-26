
import * as core from '@actions/core'
import github from '@actions/github';
import {agent} from './agent'
const context = github.context;

async function run(): Promise<void> {
  try {
    const bot = await agent.didManagerGetOrCreate({
      alias: core.getInput('bot_alias'),
      provider: 'did:web'
    })

    core.debug('context')
    core.debug(JSON.stringify(context, null, 2))

    core.setOutput('did', bot.did)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

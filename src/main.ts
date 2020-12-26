import * as core from '@actions/core'
import {agent} from './agent'

async function run(): Promise<void> {
  try {
    const bot = await agent.didManagerGetOrCreate({
      alias: core.getInput('bot_alias'),
      provider: 'did:web'
    })

    core.setOutput('did', bot.did)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

import * as core from '@actions/core'
import * as github from '@actions/github'
import {agent} from './agent'
const context = github.context

async function run(): Promise<void> {
  try {
    const bot = await agent.didManagerGetOrCreate({
      alias: `${core.getInput('bot_alias')}:${context.actor}`,
      provider: 'did:web'
    })

    const vc = await agent.createVerifiableCredential({
      credential: {
        issuer: {id: bot.did},
        type: ['VerifiableCredential', 'GitHubEvent', context.eventName],
        credentialSubject: context.payload
      },
      proofFormat: 'jwt',
      save: true
    })

    core.setOutput('JWT', vc.proof.jwt)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

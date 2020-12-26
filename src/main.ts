import * as core from '@actions/core'
import * as github from '@actions/github'
import {agent} from './agent'
const context = github.context

async function run(): Promise<void> {
  try {
    const bot = await agent.didManagerGetOrCreate({
      alias: core.getInput('bot_alias'),
      provider: 'did:web'
    })

    core.debug('CONTEXT')
    core.debug(JSON.stringify(context, null, 2))

    const vc = await agent.createVerifiableCredential({
      credential: {
        issuer: {id: bot.did},
        type: ['VerifiableCredential', 'GitHubEvent'],
        credentialSubject: context.payload
      },
      proofFormat: 'jwt',
      save: true
    })

    core.setOutput('vc', vc.proof.jwt)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

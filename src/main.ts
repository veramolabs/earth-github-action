import * as core from '@actions/core'
import * as github from '@actions/github'
import {agent} from './agent'
const context = github.context

async function run(): Promise<void> {
  try {
    const actor = await agent.didManagerGetOrCreate({
      alias: `${core.getInput('bot_alias')}:${context.actor}`,
      provider: 'did:web'
    })

    let id: string | undefined
    switch (context.eventName) {
      case 'issue_comment':
        id = context.payload.comment?.html_url
        break
      case 'issues':
        id = context.payload.issue?.html_url
        break
      default:
        //FIXME
        id = actor.did
    }

    const vc = await agent.createVerifiableCredential({
      credential: {
        issuer: {id: actor.did},
        type: ['VerifiableCredential', 'GitHubEvent', context.eventName],
        credentialSubject: {
          id,
          ...context.payload
        }
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

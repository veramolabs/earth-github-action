import {createAgent, IDIDManager} from '@veramo/core'
import {AgentRestClient} from '@veramo/remote-client'
import {ICredentialIssuer} from '@veramo/credential-w3c'
import * as core from '@actions/core'

export const agent = createAgent<IDIDManager & ICredentialIssuer>({
  plugins: [
    new AgentRestClient({
      url: core.getInput('agent_url'),
      enabledMethods: ['didManagerGetOrCreate', 'createVerifiableCredential']
    })
  ]
})

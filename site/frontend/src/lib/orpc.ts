import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'

export const orpc = createORPCClient<any>(new RPCLink({
  url: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/rpc`,
  headers: () => {
    return {}
  },
}))
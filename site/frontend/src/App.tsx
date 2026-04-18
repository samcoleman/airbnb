import { Router, Route } from '@solidjs/router'
import { onMount, createSignal } from 'solid-js'
import { orpc } from './lib/orpc'

function App() {
  onMount(async () => {
    try {
      const config = await orpc.portal.config()
      console.log('Portal config:', config)
    } catch (error) {
      console.error('Failed to fetch portal config:', error)
    }
  })

  return (
    <div class="min-h-screen bg-gray-50">
      <Router>
        <Route path="/" component={PortalPage} />
        <Route path="/welcome" component={WelcomePage} />
      </Router>
    </div>
  )
}

function PortalPage() {
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [termsAccepted, setTermsAccepted] = createSignal(false)
  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal<string | null>(null)
  const [config, setConfig] = createSignal<any>(null)

  onMount(async () => {
    try {
      const portalConfig = await orpc.portal.config()
      setConfig(portalConfig)
    } catch (err) {
      setError('Failed to load portal configuration')
    }
  })

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError(null)
    
    if (!email() || !password() || !termsAccepted()) {
      setError('Please fill in all fields and accept the terms')
      return
    }

    setLoading(true)
    
    try {
      const result = await orpc.portal.authenticate({
        email: email(),
        password: password(),
        termsAccepted: termsAccepted(),
      })
      
      if (result.success) {
        window.location.href = '/welcome'
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div class="max-w-md mx-auto p-6">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-2xl font-bold text-center mb-6">
          {config()?.portalName || 'Guest Portal'}
        </h1>
        
        {error() && (
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error()}
          </div>
        )}

        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Guest Password
            </label>
            <input
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={termsAccepted()}
                onChange={(e) => setTermsAccepted(e.currentTarget.checked)}
                required
                class="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <span class="text-sm font-medium text-gray-700">
                  I accept the terms and conditions
                </span>
                <p class="text-xs text-gray-500 mt-1">
                  {config()?.termsText || 'Please accept our terms and conditions to use the guest network.'}
                </p>
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading()}
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading() ? 'Connecting...' : 'Connect to Network'}
          </button>
        </form>
      </div>
    </div>
  )
}

function WelcomePage() {
  const [config, setConfig] = createSignal<any>(null)

  onMount(async () => {
    try {
      const portalConfig = await orpc.portal.config()
      setConfig(portalConfig)
    } catch (err) {
      console.error('Failed to fetch portal config:', err)
    }
  })

  return (
    <div class="min-h-screen bg-green-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
        <div class="text-center">
          <div class="text-green-600 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">
            Welcome!
          </h1>
          <p class="text-gray-600 mb-6">
            {config()?.welcomeMessage || 'Welcome to our guest network!'}
          </p>
          <a
            href="http://google.com"
            class="inline-block bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Start Browsing
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
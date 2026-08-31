import { Dashboard } from '@/components/dashboard'
import { SatQueryProvider } from '@/components/satquery-provider'

export default function Page() {
  return (
    <SatQueryProvider>
      <Dashboard />
    </SatQueryProvider>
  )
}

import React, { createContext, useContext, useMemo, ReactNode } from 'react'
import { GistsClient, RuntimeConfig } from './index'

interface GistsContextType {
  client: GistsClient
  config: RuntimeConfig
}

const GistsContext = createContext<GistsContextType | undefined>(undefined)

interface GistsProviderProps {
  children: ReactNode
  config: RuntimeConfig
}

export function GistsProvider({ children, config }: GistsProviderProps) {
  const value = useMemo<GistsContextType>(
    () => ({ client: new GistsClient(config), config }),
    [config],
  )

  return <GistsContext.Provider value={value}>{children}</GistsContext.Provider>
}

export function useGists() {
  const context = useContext(GistsContext)
  if (context === undefined) {
    throw new Error('useGists must be used within a GistsProvider')
  }
  return context
}

export function useGistsClient() {
  const { client } = useGists()
  return client
}

export function useGistsConfig() {
  const { config } = useGists()
  return config
}

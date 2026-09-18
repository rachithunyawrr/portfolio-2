type VisibilitySetter = (visible: boolean, delay: number) => void

const formations = new Map<string, Set<VisibilitySetter>>()
let activeFormation = 'hero'

export function registerParticleFormation(id: string, setVisibility: VisibilitySetter): () => void {
  const members = formations.get(id) ?? new Set<VisibilitySetter>()
  members.add(setVisibility)
  formations.set(id, members)
  setVisibility(id === activeFormation, 0)

  return () => {
    const current = formations.get(id)
    if (!current) return
    current.delete(setVisibility)
    if (!current.size) formations.delete(id)
  }
}

export function activateParticleFormation(id: string): void {
  if (id === activeFormation) return
  activeFormation = id

  formations.forEach((members, formationId) => {
    const visible = formationId === id
    const delay = visible ? 0.28 : 0
    members.forEach((setVisibility) => setVisibility(visible, delay))
  })
}

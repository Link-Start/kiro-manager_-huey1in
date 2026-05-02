export function attachAccountCardEvents(
  container: HTMLElement,
  onToggleSelection: (accountId: string) => void,
  onAccountAction: (accountId: string, action: string) => void
) {
  const boundContainer = container as HTMLElement & { dataset: DOMStringMap }
  if (boundContainer.dataset.accountCardEventsBound === 'true') return
  boundContainer.dataset.accountCardEventsBound = 'true'

  container.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null
    const actionElement = target?.closest('[data-action]') as HTMLElement | null
    if (!actionElement || !container.contains(actionElement)) return

    const item = actionElement.closest('.account-card, .account-list-item') as HTMLElement | null
    const accountId = item?.dataset.accountId
    const action = actionElement.dataset.action
    if (!accountId || !action) return

    e.stopPropagation()
    if (action === 'toggle-select') {
      onToggleSelection(accountId)
      return
    }

    onAccountAction(accountId, action)
  })
}

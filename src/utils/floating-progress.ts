type ProgressStatus = 'running' | 'success' | 'warning' | 'error'

interface FloatingProgressOptions {
  id: string
  title: string
  total: number
  detail?: string
}

interface ProgressUpdate {
  completed: number
  total?: number
  title?: string
  detail?: string
  status?: ProgressStatus
}

interface ProgressEntry {
  element: HTMLDivElement
  title: HTMLDivElement
  detail: HTMLDivElement
  percent: HTMLDivElement
  fill: HTMLDivElement
  hideTimer?: number
}

const entries = new Map<string, ProgressEntry>()

function ensureRoot() {
  let root = document.getElementById('floating-progress-root')
  if (!root) {
    root = document.createElement('div')
    root.id = 'floating-progress-root'
    root.className = 'floating-progress-root'
    document.body.appendChild(root)
  }
  return root
}

function clampPercent(completed: number, total: number) {
  if (total <= 0) return 0
  return Math.max(0, Math.min(100, Math.round((completed / total) * 100)))
}

function applyStatus(entry: ProgressEntry, status: ProgressStatus) {
  entry.element.dataset.status = status
  entry.fill.dataset.status = status
}

function render(entry: ProgressEntry, update: ProgressUpdate) {
  const total = update.total ?? Number(entry.element.dataset.total || 0)
  const percent = clampPercent(update.completed, total)

  entry.element.dataset.total = String(total)
  entry.title.textContent = update.title ?? entry.title.textContent
  entry.detail.textContent = update.detail ?? `${update.completed}/${total} 已完成`
  entry.percent.textContent = `${percent}%`
  entry.fill.style.width = `${percent}%`

  if (update.status) {
    applyStatus(entry, update.status)
  }
}

export function openFloatingProgress(options: FloatingProgressOptions) {
  const root = ensureRoot()
  const existing = entries.get(options.id)

  if (existing) {
    if (existing.hideTimer) window.clearTimeout(existing.hideTimer)
    existing.element.classList.remove('is-hiding')
    render(existing, {
      completed: 0,
      total: options.total,
      title: options.title,
      detail: options.detail ?? `0/${options.total} 已完成`,
      status: 'running'
    })
    return createController(options.id)
  }

  const element = document.createElement('div')
  element.className = 'floating-progress-card'
  element.dataset.total = String(options.total)
  element.dataset.status = 'running'

  const header = document.createElement('div')
  header.className = 'floating-progress-header'

  const title = document.createElement('div')
  title.className = 'floating-progress-title'
  title.textContent = options.title

  const percent = document.createElement('div')
  percent.className = 'floating-progress-percent'
  percent.textContent = '0%'

  const track = document.createElement('div')
  track.className = 'floating-progress-track'

  const fill = document.createElement('div')
  fill.className = 'floating-progress-fill'
  fill.dataset.status = 'running'
  fill.style.width = '0%'

  const detail = document.createElement('div')
  detail.className = 'floating-progress-detail'
  detail.textContent = options.detail ?? `0/${options.total} 已完成`

  header.append(title, percent)
  track.appendChild(fill)
  element.append(header, track, detail)
  root.appendChild(element)

  entries.set(options.id, { element, title, detail, percent, fill })
  return createController(options.id)
}

function createController(id: string) {
  return {
    update(update: ProgressUpdate) {
      const entry = entries.get(id)
      if (entry) render(entry, update)
    },
    finish(detail: string, status: Exclude<ProgressStatus, 'running'> = 'success') {
      const entry = entries.get(id)
      if (!entry) return

      const total = Number(entry.element.dataset.total || 1)
      render(entry, { completed: total, total, detail, status })

      if (entry.hideTimer) window.clearTimeout(entry.hideTimer)
      entry.hideTimer = window.setTimeout(() => {
        entry.element.classList.add('is-hiding')
        window.setTimeout(() => {
          entry.element.remove()
          entries.delete(id)
        }, 220)
      }, 2400)
    }
  }
}

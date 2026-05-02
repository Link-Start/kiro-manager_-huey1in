// 添加账号对话框
import type { AccountSubscription } from '../types'
import { accountStore } from '../store'
import { openFloatingProgress } from '../utils/floating-progress'

/**
 * 显示添加账号对话框
 */
export function showAddAccountDialog(): void {
  const modal = window.UI?.modal.open({
    title: '添加账号',
    html: `
      <div class="modal-form">
        <div class="form-section">
          <label class="form-label">导入方式</label>
          <div class="mode-switch">
            <button class="mode-btn active" id="mode-single" onclick="window.switchImportMode('single')">单个导入</button>
            <button class="mode-btn" id="mode-batch" onclick="window.switchImportMode('batch')">批量导入</button>
          </div>
        </div>

        <div id="single-import-form">
          <div class="form-section">
            <label class="form-label">登录类型</label>
            <div class="login-type-switch">
              <button class="login-type-btn active" id="type-builderid" onclick="window.selectLoginType('BuilderId')">BuilderId</button>
              <button class="login-type-btn" id="type-enterprise" onclick="window.selectLoginType('Enterprise')">Enterprise</button>
              <button class="login-type-btn" id="type-social" onclick="window.selectLoginType('Social')">Social</button>
            </div>
          </div>

          <div id="social-provider-section" class="form-section" style="display: none;">
            <label class="form-label">Social Provider</label>
            <div class="provider-switch">
              <button class="provider-btn active" id="provider-google" onclick="window.selectSocialProvider('Google')">Google</button>
              <button class="provider-btn" id="provider-github" onclick="window.selectSocialProvider('Github')">GitHub</button>
            </div>
            <p class="form-hint">社交登录不需要 Client ID 和 Client Secret</p>
          </div>

          <div class="form-section">
            <label class="form-label">Refresh Token <span class="required">*</span></label>
            <input type="text" class="form-input" id="refresh-token" placeholder="刷新令牌" required>
          </div>

          <div id="credentials-section">
            <div class="form-row">
              <div class="form-section">
                <label class="form-label">Client ID <span class="required">*</span></label>
                <input type="text" class="form-input" id="client-id" placeholder="客户端 ID" required>
              </div>
              <div class="form-section">
                <label class="form-label">Client Secret <span class="required">*</span></label>
                <input type="password" class="form-input" id="client-secret" placeholder="客户端密钥" required>
              </div>
            </div>
            <div class="form-section">
              <label class="form-label">Region</label>
              <div class="ui-dropdown dropdown-up" style="width: 100%;">
                <button class="ui-btn ui-btn-secondary" data-dropdown style="width: 100%; justify-content: space-between;" id="region-btn">
                  <span id="region-text">us-east-1 (N. Virginia)</span>
                  <span>▲</span>
                </button>
                <div class="ui-dropdown-menu" style="width: 100%; max-height: 300px; overflow-y: auto;">
                  <div class="dropdown-group-label">US</div>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('us-east-1', 'us-east-1 (N. Virginia)')">us-east-1 (N. Virginia)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('us-east-2', 'us-east-2 (Ohio)')">us-east-2 (Ohio)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('us-west-1', 'us-west-1 (N. California)')">us-west-1 (N. California)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('us-west-2', 'us-west-2 (Oregon)')">us-west-2 (Oregon)</button>
                  <div class="dropdown-group-label">Europe</div>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('eu-west-1', 'eu-west-1 (Ireland)')">eu-west-1 (Ireland)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('eu-west-2', 'eu-west-2 (London)')">eu-west-2 (London)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('eu-west-3', 'eu-west-3 (Paris)')">eu-west-3 (Paris)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('eu-central-1', 'eu-central-1 (Frankfurt)')">eu-central-1 (Frankfurt)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('eu-north-1', 'eu-north-1 (Stockholm)')">eu-north-1 (Stockholm)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('eu-south-1', 'eu-south-1 (Milan)')">eu-south-1 (Milan)</button>
                  <div class="dropdown-group-label">Asia Pacific</div>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('ap-northeast-1', 'ap-northeast-1 (Tokyo)')">ap-northeast-1 (Tokyo)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('ap-northeast-2', 'ap-northeast-2 (Seoul)')">ap-northeast-2 (Seoul)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('ap-northeast-3', 'ap-northeast-3 (Osaka)')">ap-northeast-3 (Osaka)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('ap-southeast-1', 'ap-southeast-1 (Singapore)')">ap-southeast-1 (Singapore)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('ap-southeast-2', 'ap-southeast-2 (Sydney)')">ap-southeast-2 (Sydney)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('ap-south-1', 'ap-south-1 (Mumbai)')">ap-south-1 (Mumbai)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('ap-east-1', 'ap-east-1 (Hong Kong)')">ap-east-1 (Hong Kong)</button>
                  <div class="dropdown-group-label">Other</div>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('ca-central-1', 'ca-central-1 (Canada)')">ca-central-1 (Canada)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('sa-east-1', 'sa-east-1 (São Paulo)')">sa-east-1 (São Paulo)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('me-south-1', 'me-south-1 (Bahrain)')">me-south-1 (Bahrain)</button>
                  <button class="ui-dropdown-item" onclick="window.selectRegion('af-south-1', 'af-south-1 (Cape Town)')">af-south-1 (Cape Town)</button>
                </div>
              </div>
              <input type="hidden" id="region" value="us-east-1">
            </div>
          </div>
        </div>

        <div id="batch-import-form" style="display: none;">
          <div class="form-section">
            <label class="form-label">批量凭证（JSON 格式）</label>
            <textarea class="form-input form-textarea" id="batch-credentials" placeholder='[
  {
    "refreshToken": "xxx",
    "clientId": "xxx",
    "clientSecret": "xxx",
    "provider": "BuilderId",
    "region": "us-east-1"
  },
  {
    "refreshToken": "yyy",
    "clientId": "yyy",
    "clientSecret": "yyy",
    "provider": "Enterprise"
  },
  {
    "refreshToken": "zzz",
    "provider": "Google"
  },
  {
    "refreshToken": "aaa",
    "provider": "Github"
  }
]' rows="6"></textarea>
            <p class="form-hint">
              格式：JSON 数组，每个对象包含 refreshToken（必填）、provider（BuilderId/Enterprise/Google/Github）、clientId、clientSecret、region（可选）
            </p>
          </div>
        </div>

        <div id="import-result" class="import-result" style="display: none;">
          <div class="result-box">
            <div class="result-title">导入结果</div>
            <p class="result-text" id="result-text"></p>
          </div>
        </div>
      </div>
    `,
    footer: `
      <button class="ui-btn ui-btn-secondary" onclick="window.closeAddAccountModal()">取消</button>
      <button class="ui-btn ui-btn-primary" id="submit-btn" onclick="window.submitAddAccount()">
        <span id="submit-text">验证并添加</span>
      </button>
    `,
    size: 'lg',
    closable: true
  })

  let currentMode: 'single' | 'batch' = 'single'
  let currentLoginType: string = 'BuilderId'
  let currentSocialProvider: string = 'Google'

  window.selectRegion = (region: string, displayText: string) => {
    const regionInput = document.getElementById('region') as HTMLInputElement
    const regionText = document.getElementById('region-text')
    if (regionInput) regionInput.value = region
    if (regionText) regionText.textContent = displayText
  }

  window.selectLoginType = (type: string) => {
    currentLoginType = type
    const buttons = document.querySelectorAll('.login-type-btn')
    buttons.forEach(btn => btn.classList.remove('active'))
    document.getElementById(`type-${type.toLowerCase()}`)?.classList.add('active')

    const socialProviderSection = document.getElementById('social-provider-section')
    const credentialsSection = document.getElementById('credentials-section')

    if (type === 'Social') {
      socialProviderSection!.style.display = 'block'
      credentialsSection!.style.display = 'none'
    } else {
      socialProviderSection!.style.display = 'none'
      credentialsSection!.style.display = 'block'
    }
  }

  window.selectSocialProvider = (provider: string) => {
    currentSocialProvider = provider
    const buttons = document.querySelectorAll('.provider-btn')
    buttons.forEach(btn => btn.classList.remove('active'))
    document.getElementById(`provider-${provider.toLowerCase()}`)?.classList.add('active')
  }

  window.switchImportMode = (mode: 'single' | 'batch') => {
    currentMode = mode
    const singleForm = document.getElementById('single-import-form')
    const batchForm = document.getElementById('batch-import-form')
    const singleBtn = document.getElementById('mode-single')
    const batchBtn = document.getElementById('mode-batch')
    const submitText = document.getElementById('submit-text')

    if (mode === 'single') {
      singleForm!.style.display = 'block'
      batchForm!.style.display = 'none'
      singleBtn!.classList.add('active')
      singleBtn!.classList.remove('inactive')
      batchBtn!.classList.remove('active')
      batchBtn!.classList.add('inactive')
      submitText!.textContent = '验证并添加'
    } else {
      singleForm!.style.display = 'none'
      batchForm!.style.display = 'block'
      singleBtn!.classList.remove('active')
      singleBtn!.classList.add('inactive')
      batchBtn!.classList.add('active')
      batchBtn!.classList.remove('inactive')
      submitText!.textContent = '批量导入'
    }
  }

  window.closeAddAccountModal = () => {
    window.UI?.modal.close(modal)
    delete window.closeAddAccountModal
    delete window.submitAddAccount
    delete window.switchImportMode
    delete window.selectRegion
    delete window.selectLoginType
    delete window.selectSocialProvider
  }

  window.submitAddAccount = async () => {
    const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement
    const submitText = document.getElementById('submit-text')
    const resultDiv = document.getElementById('import-result')
    const resultText = document.getElementById('result-text')

    if (currentMode === 'single') {
      // 单个导入
      const refreshToken = (document.getElementById('refresh-token') as HTMLInputElement)?.value.trim()
      const clientId = (document.getElementById('client-id') as HTMLInputElement)?.value.trim()
      const clientSecret = (document.getElementById('client-secret') as HTMLInputElement)?.value.trim()
      const region = (document.getElementById('region') as HTMLInputElement)?.value

      // 输入验证
      if (!refreshToken) {
        window.UI?.toast.error('请填写 Refresh Token')
        return
      }

      if (refreshToken.length < 10 || refreshToken.length > 10000) {
        window.UI?.toast.error('Refresh Token 长度不合法')
        return
      }

      // Social 登录不需要 clientId 和 clientSecret
      if (currentLoginType !== 'Social') {
        if (!clientId || !clientSecret) {
          window.UI?.toast.error('请填写所有必填项')
          return
        }

        if (clientId.length < 10 || clientId.length > 500) {
          window.UI?.toast.error('Client ID 长度不合法')
          return
        }

        if (clientSecret.length < 10 || clientSecret.length > 500) {
          window.UI?.toast.error('Client Secret 长度不合法')
          return
        }
      }

      submitBtn.disabled = true
      submitText!.textContent = '验证中...'
      const importProgress = openFloatingProgress({
        id: 'account-import',
        title: '正在导入账号',
        total: 1,
        detail: '正在验证账号凭证'
      })

      try {
        // 确定 provider
        const provider = currentLoginType === 'Social' ? currentSocialProvider : currentLoginType

        const result = await (window as any).__TAURI__.core.invoke('verify_account_credentials', {
          refreshToken,
          clientId: currentLoginType === 'Social' ? '' : clientId,
          clientSecret: currentLoginType === 'Social' ? '' : clientSecret,
          region,
          authMethod: currentLoginType === 'Social' ? 'social' : 'IdC',
          provider
        })

        if (result.success && result.data) {
          const now = Date.now()
          accountStore.addAccount({
            email: result.data.email,
            nickname: result.data.email ? result.data.email.split('@')[0] : undefined,
            idp: provider as any,
            userId: result.data.user_id,
            credentials: {
              accessToken: result.data.access_token,
              csrfToken: '',
              refreshToken: result.data.refresh_token,
              clientId: currentLoginType === 'Social' ? '' : clientId,
              clientSecret: currentLoginType === 'Social' ? '' : clientSecret,
              region: region,
              expiresAt: result.data.expires_in ? now + result.data.expires_in * 1000 : now + 3600 * 1000,
              authMethod: currentLoginType === 'Social' ? 'social' : 'IdC',
              provider: provider
            },
            subscription: {
              type: result.data.subscription_type,
              title: result.data.subscription_title,
              rawType: result.data.raw_type,
              daysRemaining: result.data.days_remaining,
              expiresAt: result.data.expires_at,
              managementTarget: result.data.management_target,
              upgradeCapability: result.data.upgrade_capability,
              overageCapability: result.data.overage_capability
            },
            usage: {
              current: result.data.usage.current,
              limit: result.data.usage.limit,
              percentUsed: result.data.usage.limit > 0 ? result.data.usage.current / result.data.usage.limit : 0,
              lastUpdated: now,
              baseLimit: result.data.usage.baseLimit,
              baseCurrent: result.data.usage.baseCurrent,
              freeTrialLimit: result.data.usage.freeTrialLimit,
              freeTrialCurrent: result.data.usage.freeTrialCurrent,
              freeTrialExpiry: result.data.usage.freeTrialExpiry,
              bonuses: result.data.usage.bonuses,
              nextResetDate: result.data.usage.nextResetDate,
              resourceDetail: result.data.usage.resourceDetail
            },
            groupId: undefined,
            tags: [],
            status: 'active',
            lastUsedAt: now
          })

          window.UI?.toast.success('账号添加成功')
          importProgress.finish('导入完成：1 个账号已添加', 'success')
          window.UI?.modal.close(modal)
          delete window.closeAddAccountModal
          delete window.submitAddAccount
          delete window.switchImportMode
          delete window.selectRegion
          delete window.selectLoginType
          delete window.selectSocialProvider
        } else {
          importProgress.finish(result.error || '导入失败：账号验证未通过', 'error')
          window.UI?.toast.error(result.error || '验证失败')
        }
      } catch (error) {
        importProgress.finish(`导入失败：${(error as Error).message}`, 'error')
        window.UI?.toast.error('验证失败: ' + (error as Error).message)
      } finally {
        submitBtn.disabled = false
        submitText!.textContent = '验证并添加'
      }
    } else {
      // 批量导入
      const batchData = (document.getElementById('batch-credentials') as HTMLTextAreaElement)?.value.trim()

      if (!batchData) {
        window.UI?.toast.error('请输入批量凭证数据')
        return
      }

      let items: any[]

      try {
        let parsed = JSON.parse(batchData)
        // 自动识别包装格式：{ version, accounts: [...] } 或 { accounts: [...] }
        if (!Array.isArray(parsed) && parsed.accounts && Array.isArray(parsed.accounts)) {
          parsed = parsed.accounts
        }
        items = Array.isArray(parsed) ? parsed : [parsed]

        // 过滤有效条目：只要包含 refreshToken（任意层级）就视为有效
        items = items.filter((item: any) => {
          if (!item || typeof item !== 'object') return false
          // 格式A：credentials.refreshToken
          if (item.credentials?.refreshToken) return true
          // 格式B/C：顶层 refreshToken
          if (typeof item.refreshToken === 'string' && item.refreshToken.trim()) return true
          return false
        })

        if (items.length === 0) {
          window.UI?.toast.error('未检测到有效账号数据')
          return
        }
      } catch {
        window.UI?.toast.error('JSON 格式错误')
        return
      }

      submitBtn.disabled = true
      submitText!.textContent = '导入中...'
      resultDiv!.style.display = 'none'

      let successCount = 0
      let failedCount = 0
      const errors: string[] = []

      // 辅助：从 usageData 解析用量
      function parseUsageData(usageData: any) {
        const now = Date.now()
        if (!usageData) return { current: 0, limit: 0, percentUsed: 0, lastUpdated: now }

        const breakdown = usageData.usageBreakdownList?.[0]
        const current = breakdown?.currentUsageWithPrecision ?? breakdown?.currentUsage ?? 0
        const limit = breakdown?.usageLimitWithPrecision ?? breakdown?.usageLimit ?? 0
        const freeTrialInfo = breakdown?.freeTrialInfo

        return {
          current,
          limit,
          percentUsed: limit > 0 ? current / limit : 0,
          lastUpdated: now,
          baseLimit: limit,
          baseCurrent: current,
          freeTrialLimit: freeTrialInfo?.usageLimitWithPrecision ?? freeTrialInfo?.usageLimit,
          freeTrialCurrent: freeTrialInfo?.currentUsageWithPrecision ?? freeTrialInfo?.currentUsage,
          freeTrialExpiry: freeTrialInfo?.freeTrialExpiry ? new Date(freeTrialInfo.freeTrialExpiry * 1000).toISOString() : undefined,
          bonuses: breakdown?.bonuses,
          nextResetDate: usageData.nextDateReset ? new Date(usageData.nextDateReset * 1000).toISOString() : undefined,
          resourceDetail: breakdown ? {
            displayName: breakdown.displayName,
            displayNamePlural: breakdown.displayNamePlural,
            resourceType: breakdown.resourceType,
            currency: breakdown.currency,
            unit: breakdown.unit,
            overageRate: breakdown.overageRate,
            overageCap: breakdown.overageCapWithPrecision ?? breakdown.overageCap
          } : undefined
        }
      }

      // 辅助：从 usageData.subscriptionInfo 解析订阅
      function parseSubscriptionInfo(subInfo: any): AccountSubscription {
        if (!subInfo) return { type: 'Free' }

        // 映射 type
        let type: AccountSubscription['type'] = 'Free'
        const rawType = subInfo.type || ''
        if (rawType.includes('PRO_PLUS')) type = 'Pro_Plus'
        else if (rawType.includes('PRO')) type = 'Pro'
        else if (rawType.includes('ENTERPRISE')) type = 'Enterprise'
        else if (rawType.includes('TEAMS')) type = 'Teams'

        return {
          type,
          title: subInfo.subscriptionTitle,
          rawType: subInfo.type,
          managementTarget: subInfo.subscriptionManagementTarget,
          upgradeCapability: subInfo.upgradeCapability,
          overageCapability: subInfo.overageCapability
        }
      }

      // 并发处理多个账号（限制 10 个并发，避免导入时请求过猛）
      const CONCURRENCY = 10
      let completedCount = 0
      const queue = items.map((item, i) => ({ item, i }))
      const importProgress = openFloatingProgress({
        id: 'account-import',
        title: '正在批量导入账号',
        total: items.length,
        detail: `0/${items.length} 已完成`
      })

      async function processItem(item: any, i: number) {
        try {
          // 格式A：完整 Account 格式（含 credentials 对象）
          if (item.credentials && item.credentials.refreshToken) {
            const now = Date.now()
            accountStore.addAccount({
              email: item.email || '',
              nickname: item.nickname || (item.email ? item.email.split('@')[0] : undefined),
              idp: item.idp || item.credentials.provider || 'BuilderId',
              userId: item.userId,
              credentials: {
                accessToken: item.credentials.accessToken || '',
                csrfToken: item.credentials.csrfToken || '',
                refreshToken: item.credentials.refreshToken,
                clientId: item.credentials.clientId || '',
                clientSecret: item.credentials.clientSecret || '',
                region: item.credentials.region || 'us-east-1',
                expiresAt: item.credentials.expiresAt || now + 3600 * 1000,
                authMethod: item.credentials.authMethod || 'IdC',
                provider: item.credentials.provider || item.idp || 'BuilderId'
              },
              subscription: item.subscription || { type: 'Free' },
              usage: item.usage || { current: 0, limit: 0, percentUsed: 0, lastUpdated: now },
              groupId: item.groupId || undefined,
              tags: item.tags || [],
              status: item.status || 'active',
              lastUsedAt: item.lastUsedAt || now
            })
            successCount++
          }
          // 格式B：扁平导出格式（顶层 refreshToken + clientId + usageData/email）
          // 仅在 JSON 已带完整数据时直接存；否则走下方格式C 的 API 验证流程获取邮箱/用量/订阅
          else if (item.refreshToken && item.clientId && item.clientSecret && (item.usageData || item.email)) {
            const now = Date.now()
            const provider = item.provider || 'BuilderId'
            const isSocial = provider === 'Google' || provider === 'Github'

            accountStore.addAccount({
              email: item.email || item.usageData?.userInfo?.email || '',
              nickname: (item.email || item.usageData?.userInfo?.email || '').split('@')[0] || undefined,
              idp: provider as any,
              userId: item.userId || item.usageData?.userInfo?.userId,
              credentials: {
                accessToken: item.accessToken || '',
                csrfToken: '',
                refreshToken: item.refreshToken,
                clientId: item.clientId,
                clientSecret: item.clientSecret,
                region: item.region || 'us-east-1',
                expiresAt: item.expiresAt ? new Date(item.expiresAt).getTime() : now + 3600 * 1000,
                authMethod: item.authMethod || (isSocial ? 'social' : 'IdC'),
                provider
              },
              subscription: parseSubscriptionInfo(item.usageData?.subscriptionInfo),
              usage: parseUsageData(item.usageData),
              groupId: item.groupId || undefined,
              tags: item.tagLinks || [],
              status: item.status || 'active',
              lastUsedAt: now
            })
            successCount++
          }
          // 格式C：简化格式（仅 refreshToken，走 API 验证）
          else {
            const provider = item.provider || 'BuilderId'
            const isSocial = provider === 'Google' || provider === 'Github'
            const authMethod = isSocial ? 'social' : 'IdC'

            if (!isSocial && (!item.clientId || !item.clientSecret)) {
              failedCount++
              errors.push(`#${i + 1}: ${provider} 需要 clientId 和 clientSecret`)
              return
            }

            const result = await (window as any).__TAURI__.core.invoke('verify_account_credentials', {
              refreshToken: item.refreshToken,
              clientId: item.clientId || '',
              clientSecret: item.clientSecret || '',
              region: item.region || 'us-east-1',
              authMethod,
              provider
            })

            if (result.success && result.data) {
              const now = Date.now()
              accountStore.addAccount({
                email: result.data.email,
                nickname: result.data.email ? result.data.email.split('@')[0] : undefined,
                idp: provider as any,
                userId: result.data.user_id,
                credentials: {
                  accessToken: result.data.access_token,
                  csrfToken: '',
                  refreshToken: result.data.refresh_token,
                  clientId: item.clientId || '',
                  clientSecret: item.clientSecret || '',
                  region: item.region || 'us-east-1',
                  expiresAt: result.data.expires_in ? now + result.data.expires_in * 1000 : now + 3600 * 1000,
                  authMethod,
                  provider
                },
                subscription: {
                  type: result.data.subscription_type,
                  title: result.data.subscription_title,
                  rawType: result.data.raw_type,
                  daysRemaining: result.data.days_remaining,
                  expiresAt: result.data.expires_at,
                  managementTarget: result.data.management_target,
                  upgradeCapability: result.data.upgrade_capability,
                  overageCapability: result.data.overage_capability
                },
                usage: {
                  current: result.data.usage.current,
                  limit: result.data.usage.limit,
                  percentUsed: result.data.usage.limit > 0 ? result.data.usage.current / result.data.usage.limit : 0,
                  lastUpdated: now,
                  baseLimit: result.data.usage.baseLimit,
                  baseCurrent: result.data.usage.baseCurrent,
                  freeTrialLimit: result.data.usage.freeTrialLimit,
                  freeTrialCurrent: result.data.usage.freeTrialCurrent,
                  freeTrialExpiry: result.data.usage.freeTrialExpiry,
                  bonuses: result.data.usage.bonuses,
                  nextResetDate: result.data.usage.nextResetDate,
                  resourceDetail: result.data.usage.resourceDetail
                },
                groupId: undefined,
                tags: [],
                status: 'active',
                lastUsedAt: now
              })
              successCount++
            } else if (result.data && result.data.user_id) {
              // 封号场景：API 返回 success=false 但带回了 access_token/user_id 等部分数据
              // 仍存进列表，标记为 suspended（已封禁），让萌主在 UI 上能看到
              const now = Date.now()
              const shortId = result.data.user_id.slice(0, 8)
              accountStore.addAccount({
                email: result.data.email || `(已封禁) ${shortId}`,
                nickname: shortId,
                idp: provider as any,
                userId: result.data.user_id,
                credentials: {
                  accessToken: result.data.access_token || '',
                  csrfToken: '',
                  refreshToken: result.data.refresh_token || item.refreshToken,
                  clientId: item.clientId || '',
                  clientSecret: item.clientSecret || '',
                  region: item.region || 'us-east-1',
                  expiresAt: result.data.expires_in ? now + result.data.expires_in * 1000 : now + 3600 * 1000,
                  authMethod,
                  provider
                },
                subscription: {
                  type: 'Free' as any,
                  title: result.data.subscription_title
                },
                usage: { current: 0, limit: 0, percentUsed: 0, lastUpdated: now },
                groupId: undefined,
                tags: [],
                status: 'suspended',
                lastUsedAt: now
              })
              successCount++
              errors.push(`#${i + 1}: ${result.error || '账号被封禁'}（已导入并标记为已封禁）`)
            } else {
              failedCount++
              errors.push(`#${i + 1}: ${result.error || '验证失败'}`)
            }
          }
        } catch (error) {
          failedCount++
          errors.push(`#${i + 1}: ${(error as Error).message}`)
        }

        // 更新进度（并发场景下按完成顺序累加）
        completedCount++
        submitText!.textContent = `导入中... (${completedCount}/${items.length})`
        importProgress.update({
          completed: completedCount,
          total: items.length,
          detail: `成功 ${successCount} 个，失败 ${failedCount} 个`
        })
      }

      // 启动 worker pool：最多 CONCURRENCY 个并发，每个 worker 处理完一个就拉下一个
      const workers: Promise<void>[] = []
      for (let w = 0; w < Math.min(CONCURRENCY, queue.length); w++) {
        workers.push((async () => {
          while (queue.length > 0) {
            const next = queue.shift()
            if (!next) return
            await processItem(next.item, next.i)
          }
        })())
      }
      await Promise.all(workers)

      // 显示结果
      resultDiv!.style.display = 'block'
      resultText!.textContent = `成功: ${successCount} 个，失败: ${failedCount} 个${errors.length > 0 ? '\n\n错误详情:\n' + errors.join('\n') : ''}`

      if (successCount > 0) {
        window.UI?.toast.success(`成功导入 ${successCount} 个账号`)
      }
      importProgress.finish(
        `导入完成：成功 ${successCount} 个，失败 ${failedCount} 个`,
        failedCount === 0 ? 'success' : 'warning'
      )

      if (failedCount === 0) {
        setTimeout(() => {
          window.UI?.modal.close(modal)
          delete window.closeAddAccountModal
          delete window.submitAddAccount
          delete window.switchImportMode
          delete window.selectRegion
          delete window.selectLoginType
          delete window.selectSocialProvider
        }, 2000)
      }

      submitBtn.disabled = false
      submitText!.textContent = '批量导入'
    }
  }
}

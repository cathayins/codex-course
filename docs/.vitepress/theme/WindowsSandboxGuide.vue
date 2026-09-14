<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <div class="sandbox-guide">
    <div class="sandbox-illustration" role="img" aria-label="Windows 沙箱設定失敗後，完整關閉 App 並重新設定的示意圖">
      <section class="setup-window">
        <div class="window-bar" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <div class="setup-content">
          <div class="windows-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
          <span class="setup-kicker">CODEX FOR WINDOWS</span>
          <h3>完成 Windows 設定</h3>
          <p>沙箱需要一次性設定，才能在限制範圍內安全地執行工作。</p>

          <div class="uac-dialog">
            <small>使用者帳戶控制</small>
            <strong>允許此應用程式變更您的裝置嗎？</strong>
            <div class="uac-app">
              <img :src="withBase('/images/quick-start/chatgpt-icon.webp')" width="28" height="28" alt="" aria-hidden="true">
              <span>ChatGPT<br><small>已驗證的發行者：OpenAI, L.L.C.</small></span>
            </div>
            <div class="uac-actions"><span>否</span><b>是</b></div>
          </div>

          <div class="setup-status"><i>!</i><span><b>Windows 設定未完成</b><small>完整關閉 App 後再試一次</small></span></div>
          <div class="retry-button">再次嘗試 Windows 設定</div>
        </div>
      </section>

      <aside class="setup-steps" aria-label="Windows 沙箱排解步驟">
        <section>
          <span>01</span>
          <div>
            <strong>從工作管理員完整關閉 App</strong>
            <p>按 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Esc</kbd> 開啟工作管理員，找到 ChatGPT／Codex，按下「結束工作」。重新開啟 App，再次嘗試 Windows 設定；出現 UAC 提示時選擇「是」。</p>
          </div>
        </section>

        <section>
          <span>02</span>
          <div>
            <strong>仍失敗，移除 <code>auth.json</code></strong>
            <p>再次結束 App，按 <kbd>Win</kbd> + <kbd>R</kbd>，輸入 <code>%USERPROFILE%\.codex</code>。移除 <code>auth.json</code> 後重新開啟 App，依畫面完成登入，再測試一次。</p>
            <small><code>auth.json</code> 是登入憑證快取，移除後必須重新登入；檔案內含存取權杖，請勿傳給他人。</small>
          </div>
        </section>

        <section>
          <span>03</span>
          <div>
            <strong>還是不行，回報協助排查</strong>
            <p>蒐集下方 Log 與錯誤資訊，交給 Trainer／業管單位回報，我們會再協助排查。</p>
          </div>
        </section>
      </aside>
    </div>

    <div class="report-panel">
      <section>
        <span>LOG 位置</span>
        <strong>取得沙箱紀錄</strong>
        <p>按 <kbd>Win</kbd> + <kbd>R</kbd>，輸入 <code>%USERPROFILE%\.codex\.sandbox</code>，找到 <code>sandbox.log</code>。</p>
      </section>
      <section>
        <span>一起提供</span>
        <strong>讓問題更快定位</strong>
        <p>附上錯誤畫面、發生時間、Windows 版本，以及在哪一個步驟失敗。</p>
      </section>
      <section class="report-panel__warning">
        <span>不要提供</span>
        <strong>登入憑證與沙箱密鑰</strong>
        <p>請勿傳送 <code>auth.json</code> 或 <code>.sandbox-secrets</code> 內的任何內容。</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.sandbox-guide {
  --blue: #1677d2;
  --blue-soft: #eaf3fb;
  --ink: #282826;
  --muted: #676761;
  --line: #deded8;
  margin: 22px 0 0;
  color: var(--ink);
}

.sandbox-illustration {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(300px, .92fr);
  gap: 18px;
  padding: clamp(16px, 2.5vw, 26px);
  border: 1px solid var(--line);
  border-radius: 20px;
  background: #f7f7f5;
}

.setup-window {
  min-width: 0;
  overflow: hidden;
  border: 1px solid #d9d9d4;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 16px 36px rgb(35 45 55 / 9%);
}

.window-bar {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 10px 13px;
  border-bottom: 1px solid #e8e8e4;
  background: #fafafa;
}

.window-bar span {
  width: 8px;
  height: 8px;
  border: 1px solid #9d9d98;
  border-radius: 50%;
}

.setup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(22px, 4vw, 42px) clamp(18px, 4vw, 48px) 28px;
  text-align: center;
}

.windows-mark {
  display: grid;
  grid-template-columns: repeat(2, 14px);
  gap: 3px;
  margin-bottom: 13px;
  transform: skewY(-3deg);
}

.windows-mark i { width: 14px; height: 14px; background: var(--blue); }
.windows-mark i:nth-child(2) { background: #46a7e8; }
.windows-mark i:nth-child(3) { background: #0b62ae; }
.windows-mark i:nth-child(4) { background: #3492d9; }

.setup-kicker {
  color: var(--blue);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .12em;
}

.setup-content h3 {
  margin: 6px 0 4px;
  font-size: clamp(19px, 2.2vw, 25px);
  letter-spacing: -.025em;
}

.setup-content > p {
  max-width: 390px;
  margin: 0 !important;
  color: var(--muted) !important;
  font-size: 12px !important;
  line-height: 1.65 !important;
}

.uac-dialog {
  width: min(100%, 390px);
  margin: 18px 0 16px;
  overflow: hidden;
  border: 1px solid #d4d4cf;
  border-radius: 9px;
  background: #f4f5f6;
  text-align: left;
  box-shadow: 0 10px 24px rgb(30 45 55 / 14%);
}

.uac-dialog > small,
.uac-dialog > strong,
.uac-app {
  display: block;
  padding-right: 15px;
  padding-left: 15px;
}

.uac-dialog > small { padding-top: 10px; color: #666; font-size: 9px; }
.uac-dialog > strong { padding-top: 8px; font-size: 12px; }
.uac-app { display: flex; align-items: center; gap: 9px; padding-top: 12px; padding-bottom: 13px; color: #3d4146; font-size: 11px; }
.uac-app img { flex: 0 0 28px; border-radius: 7px; }
.uac-app small { color: #73777b; font-size: 8px; }
.uac-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 9px 12px; border-top: 1px solid #dadbdc; background: #e9eaeb; text-align: center; }
.uac-actions span,
.uac-actions b { padding: 6px; border: 1px solid #c8c9ca; border-radius: 4px; background: #fff; font-size: 10px; font-weight: 600; }
.uac-actions b { border-color: #0c6ec7; color: #fff; background: var(--blue); }

.setup-status {
  display: flex;
  align-items: center;
  gap: 9px;
  width: min(100%, 390px);
  margin-bottom: 10px;
  text-align: left;
}

.setup-status > i {
  display: grid;
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  place-items: center;
  border-radius: 50%;
  color: #a84736;
  background: #f7e7e2;
  font-style: normal;
  font-weight: 800;
}

.setup-status b,
.setup-status small { display: block; }
.setup-status b { color: #963c2e; font-size: 11px; }
.setup-status small { margin-top: 2px; color: #77736e; font-size: 9px; }

.retry-button {
  width: min(100%, 390px);
  padding: 10px 14px;
  border-radius: 999px;
  color: #fff;
  background: #191919;
  font-size: 11px;
  font-weight: 700;
}

.setup-steps {
  display: grid;
  align-content: center;
  gap: 10px;
}

.setup-steps > section {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 12px;
  padding: 15px;
  border: 1px solid #e3e2dd;
  border-radius: 13px;
  background: rgb(255 255 255 / 82%);
}

.setup-steps > section > span {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  color: var(--blue);
  background: var(--blue-soft);
  font-size: 10px;
  font-weight: 800;
}

.setup-steps p { margin: 4px 0 0 !important; color: var(--muted) !important; font-size: 12px !important; line-height: 1.62 !important; }
.setup-steps strong { display: block; color: var(--ink); font-size: 13px; }
.setup-steps small { display: block; margin-top: 9px; padding-top: 9px; border-top: 1px solid #e6d8d2; color: #8a4b3e; font-size: 10.5px; line-height: 1.6; }
.setup-steps code { font-size: .94em; overflow-wrap: anywhere; }

.report-panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  margin-top: 14px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 14px;
}

.report-panel section { min-width: 0; padding: 18px; background: #f1f5f7; }
.report-panel section + section { border-left: 1px solid var(--line); }
.report-panel span { color: #63717b; font-size: 9px; font-weight: 800; letter-spacing: .08em; }
.report-panel strong { display: block; margin-top: 8px; color: var(--ink); font-size: 14px; }
.report-panel p { margin: 7px 0 0 !important; color: var(--muted) !important; font-size: 12px !important; line-height: 1.7 !important; overflow-wrap: anywhere; }
.report-panel code { font-size: 11px; }
.report-panel__warning { background: #faf0ec !important; }
.report-panel__warning span,
.report-panel__warning strong { color: #91483a; }
.report-panel kbd,
.setup-steps kbd { padding: 1px 4px; border: 1px solid #d4d6d7; border-bottom-width: 2px; border-radius: 4px; color: #46515b; background: #fff; box-shadow: none; font-size: .9em; }

@media (max-width: 760px) {
  .sandbox-illustration { grid-template-columns: 1fr; padding: 13px; border-radius: 16px; }
  .setup-content { padding-right: 16px; padding-left: 16px; }
  .setup-steps { gap: 8px; }
  .report-panel { grid-template-columns: 1fr; }
  .report-panel section + section { border-top: 1px solid var(--line); border-left: 0; }
}

:global(.dark) .sandbox-guide { --ink: #ecebe7; --muted: #b6b6b0; --line: #42433f; --blue-soft: #173b5d; }
:global(.dark) .sandbox-illustration { background: #242522; }
:global(.dark) .setup-window { background: #1e1f1d; }
:global(.dark) .window-bar { border-color: #383936; background: #292a27; }
:global(.dark) .setup-content > p,
:global(.dark) .setup-steps p,
:global(.dark) .report-panel p { color: var(--muted) !important; }
:global(.dark) .setup-steps > section { border-color: #41423f; background: #292a27; }
:global(.dark) .report-panel section { background: #292e31; }
</style>

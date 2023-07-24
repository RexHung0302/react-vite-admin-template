'use strict';

// 可客製化 git cz 的設定檔，可參考：https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js

module.exports = {
  types: [
    { value: 'feat', name: '新功能 🆒 - 一個新的功能' },
    { value: 'fix', name: '修覆 🛠️ - 修覆一個Bug' },
    { value: 'docs', name: '文檔 📄 - 變更的只有文檔' },
    { value: 'style', name: '格式 🔧 - 不影響程式碼運行的變動(空白、格式、分號等等)' },
    { value: 'refactor', name: '重構 🔩 - 代碼重構，注意和特性、修覆區分開' },
    { value: 'perf', name: '性能 🚀 - 提升性能' },
    { value: 'test', name: '測試 🥽 - 添加一個測試' },
    { value: 'update', name: '更新 🪛 - 更新某功能' },
    { value: 'ui', name: 'UI 🖼️ - 更新 UI' },
    { value: 'build', name: '持續集成 🏭 - 構建流程、外部依賴變更，比如升級 npm 包' },
    { value: 'chore', name: '工具 🧰 - 開發工具變動(構建、腳手架工具等)' },
    { value: 'ci', name: 'CI 🤖 - 持續集成修改' },
    { value: 'optimize', name: '優化 🚗 - 代碼優化' },
    { value: 'revert', name: '退版 ❕ - 退回前版本' },
  ],

  scopes: [{ name: '畫面' }, { name: '商業邏輯' }, { name: '開發工具' }, { name: '文檔' }, { name: '其他' }],

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: '選擇一種你的提交類型:',
    scope: '選擇一個 scope 表示 commit 影響範圍 (可選填):',
    // used if allowCustomScopes is true
    customScope: '請自行輸入修改範圍(可選):',
    subject: '短說明:\n',
    body: '長說明，使用"|"換行(可選)：\n',
    breaking: '非兼容性說明 (可選):\n',
    footer: '關聯關閉的issue，例如：#31, #34(可選):\n',
    confirmCommit: '確定提交說明?',
  },

  allowEmptyScopes: true,
  allowCustomScopes: true,
  skipEmptyScopes: true,
  customScopesName: '自行填寫',
  emptyScopesName: '不填寫',
  allowBreakingChanges: ['特性', '修覆'],
  askAnswered: true,

  // limit subject length
  subjectLimit: 100,
};

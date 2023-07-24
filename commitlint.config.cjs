/*
 * @Description: commit-msg提交信息格式規範
 *
 * commit-msg格式: <type>(scope?): <subject>
 *  - type: 用於表明我們這次提交的改動類型，是新增了功能？還是修改了測試代碼？又或者是更新了文檔？
 *    - feat: 新特性、新功能（feature）
 *    - fix: 修改bug（fixbug）
 *    - docs: 僅文檔新增/改動 （documentation）
 *    - style: 代碼格式修改, 注意不是 css 修改
 *    - refactor: 代碼重構
 *    - perf: 優化相關，比如提升性能、體驗
 *    - test: 測試用例修改
 *    - update: 更新某功能
 *    - ui: 更新UI
 *    - build: 編譯相關的修改，例如發布版本、對項目構建或者依賴的改動
 *    - chore: 其他修改, 比如改變構建流程、或者增加依賴庫、工具等
 *    - ci: 持續集成修改
 *    - optimize: 優化構建工具或運行時性能
 *    - revert: 回滾到上一個版本
 *  - scope：一個可選的修改範圍。用於標識此次提交主要涉及到代碼中哪個模塊。
 *  - Subject：一句話描述此次提交的主要內容，做到言簡意賅
 */
const type = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'update', 'ui', 'build', 'chore', 'ci', 'optimize', 'revert'];
// eslint-disable-next-line no-undef
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  ignores: [commit => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-empty': [2, 'never'], // <type> 不能為空
    'type-enum': [2, 'always', [...type]], // <type> 規定使用類型
    'type-case': [0],
    'scope-empty': [0], // <scope> 可為空
    'subject-empty': [2, 'never'], // <subject> 不能為空 (默認)
    'subject-full-stop': [2, 'never', '.'], // <subject> 結尾不加'.'
    'subject-case': [0],
    'header-max-length': [2, 'always', 72], // header最大72個字符
    'body-leading-blank': [1, 'always'], // body上面要有換行
    'footer-leading-blank': [1, 'always'], // footer上面要有換行
  },
};

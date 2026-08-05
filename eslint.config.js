import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'src/html/**'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // 컴포넌트 파일명이 항상 여러 단어일 필요는 없음 (App.vue 등)
      'vue/multi-word-component-names': 'off',
      // 구조분해 시 의도적으로 버리는 값은 _ 접두사로 표시 (예: const { name: _liveName, ...rest } = obj)
      'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    },
  },
  {
    // v-html 디렉티브 자체를 학습하기 위한 연습 파일이라 의도적으로 사용함
    files: ['src/kkkk.vue', 'src/xss.vue'],
    rules: {
      'vue/no-v-html': 'off',
    },
  },
]

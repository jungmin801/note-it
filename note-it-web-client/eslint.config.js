import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import * as prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier'; // Prettier 플러그인 추가

export default [
  { ignores: ['dist', 'vite.config.ts', 'eslint.config.js'] }, // 'dist' 디렉토리는 ESLint 검사를 무시
  {
    ...tseslint.configs.recommended,
    files: ['src/**/*.{js,jsx,ts,tsx}'], // ESLint가 검사할 파일 확장자 설정
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020, // ECMAScript 2020 지원
      globals: globals.browser, // 브라우저 전역 변수 허용
      parserOptions: {
        ecmaVersion: 'latest', // 최신 ECMAScript 버전 지원
        ecmaFeatures: { jsx: true }, // JSX 지원
        sourceType: 'module', // ECMAScript 모듈 사용
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    settings: {
      react: { version: '18.3' }, // React 버전 감지
    },
    plugins: {
      react, // React ESLint 플러그인
      'react-hooks': reactHooks, // React Hooks 플러그인
      'react-refresh': reactRefresh, // React Fast Refresh 플러그인
      prettier: prettierPlugin, // Prettier 플러그인 추가
    },
    rules: {
      ...js.configs.recommended.rules, // ESLint 추천 규칙 적용
      ...react.configs.recommended.rules, // React 추천 규칙 적용
      ...react.configs['jsx-runtime'].rules, // JSX 런타임 관련 규칙
      ...reactHooks.configs.recommended.rules, // React Hooks 추천 규칙 적용
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'react/jsx-no-target-blank': 'off', // target="_blank" 보안 경고 비활성화
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];

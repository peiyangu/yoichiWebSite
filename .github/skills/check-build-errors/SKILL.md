---
name: check-build-errors
description: "Next.jsプロジェクトのビルドエラーを確認するスキル。コードを修正した後、必ずこのスキルでビルドが成功するか確認すること。TypeScriptの型エラー、importエラー、モジュール解決エラーなどを検出する。Use when: after fixing bugs, after modifying components, before completing any code task."
argument-hint: "省略可。特定のファイルやエラーに絞りたい場合に指定"
---

# Next.js ビルドエラー確認スキル

## 目的

コード修正後に必ずビルドエラーがないかを確認し、破損した状態でタスクを完了しないようにする。

## 実行手順

### 1. ビルドを実行する

ターミナルで以下を実行し、ビルドエラーを確認する：

```powershell
cd d:\programing\yoruichi
npx next build 2>&1 | Select-Object -First 80
```

### 2. 結果を判定する

**成功の場合：**
- `✓ Compiled successfully` または `Route (app)` のルート一覧が表示される
- エラーメッセージが存在しない

**失敗の場合：**
- `Build error occurred` が表示される
- エラーのファイルパスと行番号が示される
- エラーの内容を読み、修正が必要な箇所を特定する

### 3. エラー修正後の再確認

エラーを修正したら、再度このスキルの手順1〜2を繰り返し、ビルドが成功するまで修正を続ける。

## よくあるエラーパターン

| エラー | 原因 | 対処法 |
|--------|------|--------|
| `Export X doesn't exist in target module` | 存在しないアイコン・関数のimport | 正しいexport名に変更するか、別コンポーネントを使用 |
| `Cannot find module` | パスが間違っている | importパスを修正する |
| `Type error` | TypeScriptの型不一致 | 型を合わせるか型アサーションを使用 |
| `'X' is not defined` | 未importの変数使用 | 適切にimportを追加 |

## 完了条件

ビルドコマンドが終了コード `0` で完了し、エラーメッセージが表示されないこと。

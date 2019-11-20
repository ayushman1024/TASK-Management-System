<p align="center">
  <img src="https://habrastorage.org/webt/y2/m3/yt/y2m3ytqadzph9hos5taqwyp6axw.png" />
</p>

<h1 align="center">Schematics</h1>
  <p align="center">This repository contains schematics for generating NGXS Store in Angular apps using the Angular CLI.</p>
  <p align="center">
    <a href="https://travis-ci.org/ngxs/schematics">
      <img src="https://travis-ci.org/ngxs/schematics.svg?branch=master" />
    </a>
    <a href="https://badge.fury.io/js/%40ngxs%2Fschematics">
      <img src="https://badge.fury.io/js/%40ngxs%2Fschematics.svg">
    </a> 
    <a href="https://github.com/ngxs/schematics/blob/master/LICENCE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
    </a>
    <a href="https://codeclimate.com/github/ngxs/schematics/maintainability">
      <img src="https://api.codeclimate.com/v1/badges/f5c522a094a9303cac05/maintainability" />
    </a>
    <a href="https://codeclimate.com/github/ngxs/schematics/test_coverage">
      <img src="https://api.codeclimate.com/v1/badges/f5c522a094a9303cac05/test_coverage" />
    </a>
    <a href="https://greenkeeper.io/">
      <img src="https://badges.greenkeeper.io/ngxs/schematics.svg">
    </a>
</p>
  
## Installation

### Install Angular CLI

You should be using `@angular/cli@6.1.0` or newer.

```bash
npm i -g @angular/cli
```

### Install NGXS Schematics
```bash
npm i @ngxs/schematics
```

### Easy way to add NGXS Store in your application 

To add NGXS Store in application, you can use `ng add` with `@ngxs/schematics`.

```bash
ng add @ngxs/schematics
```

| Option | Description
| --- | ---
| --skipInstall | The flag to skip packages installing

Result:

```
Installed packages for tooling via npm.

  Adding npm dependencies

  ✅️ Added "@ngxs/devtools-plugin" into dependencies
  ✅️ Added "@ngxs/logger-plugin" into dependencies
  ✅️ Added "@ngxs/store" into dependencies
  ✅️ Added "@ngxs/schematics" into devDependencies

  Adding @ngxs/schematics to angular.json

  UPDATE package.json (2920 bytes)
  ✅️ Setting NGXS Schematics as default

  👏 Create your first ngxs store by using starter kit: ng g ngxs-sk --spec

  🔍 Installing packages...
```

## Usage

### Generating Components

You can use the ng generate (or just ng g) command to generate ngxs components:

```bash
ng generate @ngxs/schematics:store --name todo
ng g @ngxs/schematics:store --name todo
```

All possible commands in the table below:

| Scaffold | Usage | Aliases | Options
| --- | --- | --- | ---
| Store | ng g @ngxs/schematics:store | ngxs-store | --name (required), --path, --sourceRoot, --spec (boolean)
| State | ng g @ngxs/schematics:state | ngxs-state | --name (required), --path, --sourceRoot, --spec (boolean)
| Actions | ng g @ngxs/schematics:actions | ngxs-actions | --name (required), --path, --sourceRoot
| Starter Kit | ng g @ngxs/schematics:starter-kit | ngxs-sk | --path, --sourceRoot, --spec (boolean)

### Aliases

For used the aliases you need to set @ngxs/schematics as the default collection. Update your project's `angular.json`:

```json
"cli": {
  "defaultCollection": "@ngxs/schematics"
}
```

Or simply use `ng add @ngxs/schematics --skipInstall`

### Options

`--name` - there is a name of your store, state or actions <br />
`--spec` - flag that allow to generate the test file <br />
`--sourceRoot` - absolute path to create your files (in default - `src`) <br />
`--path` - path relative to `--sourceRoot` (for example, `--path=app` -> `/src/app`)


## Examples

### Create a NGXS Store
To generate store with `@ngxs/schematics`:

```bash
ng generate @ngxs/schematics:store --name todo
```

Result:

```ts
CREATE src/todo/todo.actions.ts
CREATE src/todo/todo.state.ts

```

Or with spec:

```bash
ng generate @ngxs/schematics:store --name todo --spec
```

Result:

```ts
CREATE src/todo/todo.actions.ts
CREATE src/todo/todo.state.spec.ts
CREATE src/todo/todo.state.ts
```

### Create a NGXS State
To generate state with `@ngxs/schematics`:

```bash
ng generate @ngxs/schematics:state --name todo
```

Result:

```ts
CREATE src/todo/todo.state.ts

```

Or with spec:

```bash
ng generate @ngxs/schematics:state --name todo --spec
```

Result:

```ts
CREATE src/todo/todo.state.spec.ts
CREATE src/todo/todo.state.ts
```

### Create a NGXS Actions
To generate state with `@ngxs/schematics`:

```bash
ng generate @ngxs/schematics:actions --name todo
```

Result:

```ts
CREATE src/todo/todo.actions.ts

```

## NGXS Starter Kit

### Usage
To generate store with `@ngxs/schematics:starter-kit`:

```bash
ng generate @ngxs/schematics:starter-kit
```

Result:

```ts
CREATE src/store/store.config.ts
CREATE src/store/store.module.ts
CREATE src/store/auth/auth.actions.ts
CREATE src/store/auth/auth.state.ts
CREATE src/store/dashboard/index.ts
CREATE src/store/dashboard/states/dictionary/dictionary.actions.ts
CREATE src/store/dashboard/states/dictionary/dictionary.state.ts
CREATE src/store/dashboard/states/user/user.actions.ts
CREATE src/store/dashboard/states/user/user.state.ts
```

Or with spec:

```bash
ng generate @ngxs/schematics:starter-kit --spec
```

Result:

```ts
CREATE src/store/store.config.ts
CREATE src/store/store.module.ts
CREATE src/store/auth/auth.actions.ts
CREATE src/store/auth/auth.state.spec.ts
CREATE src/store/auth/auth.state.ts
CREATE src/store/dashboard/index.ts
CREATE src/store/dashboard/states/dictionary/dictionary.actions.ts
CREATE src/store/dashboard/states/dictionary/dictionary.state.spec.ts
CREATE src/store/dashboard/states/dictionary/dictionary.state.ts
CREATE src/store/dashboard/states/user/user.actions.ts
CREATE src/store/dashboard/states/user/user.state.spec.ts
CREATE src/store/dashboard/states/user/user.state.ts
```

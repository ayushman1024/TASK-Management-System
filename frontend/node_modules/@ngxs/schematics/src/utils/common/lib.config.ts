const packageJson = require('../../../package.json');

export enum LIBRARIES {
  STORE = '@ngxs/store',
  LOGGER = '@ngxs/logger-plugin',
  DEVTOOLS = '@ngxs/devtools-plugin',
  SCHEMATICS = '@ngxs/schematics'
}

export enum NodeDependencyType {
  Default = 'dependencies',
  Dev = 'devDependencies',
  Peer = 'peerDependencies',
  Optional = 'optionalDependencies'
}

export interface LibConfigInterface {
  type: NodeDependencyType;
  name: string;
  version: string;
  overwrite?: boolean;
}

export const LIB_CONFIG: LibConfigInterface[] = [
  {
    type: NodeDependencyType.Default,
    name: LIBRARIES.DEVTOOLS,
    version: '^3.3.2',
    overwrite: true
  },
  {
    type: NodeDependencyType.Default,
    name: LIBRARIES.LOGGER,
    version: '^3.3.2',
    overwrite: true
  },
  {
    type: NodeDependencyType.Default,
    name: LIBRARIES.STORE,
    version: '^3.3.2',
    overwrite: true
  },
  {
    type: NodeDependencyType.Dev,
    name: LIBRARIES.SCHEMATICS,
    version: `^${packageJson.version}`,
    overwrite: true
  }
];

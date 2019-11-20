import { LIB_CONFIG, LibConfigInterface, NodeDependencyType } from './common/lib.config';

export function depsToAdd(type: NodeDependencyType): string[] {
  return LIB_CONFIG.filter((pkg: LibConfigInterface) => pkg.type === type)
    .reduce((acc, pkg) => [...acc, pkg.name], [])
    .sort();
}

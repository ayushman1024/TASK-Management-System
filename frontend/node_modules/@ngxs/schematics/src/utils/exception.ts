import { SchematicsException } from '@angular-devkit/schematics';

type factoryOptions<T> = T | any;

export function factoryException<T>(options: factoryOptions<T>) {
  const properties = Object.keys(options);
  properties.forEach((prop: factoryOptions<T>) => {
    if (prop.name && !prop.name.value) {
      throw new SchematicsException(`[WARN!] --name option is required.`);
    }
    return prop;
  });
}

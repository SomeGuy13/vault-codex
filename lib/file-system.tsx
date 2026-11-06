import 'server-only'
import path from 'path'

const ROOT = path.resolve('./content')

export function resolveSafe(virtual: string): string {
  const clean = path.posix.normalize('/' + virtual);
  const full = path.resolve(ROOT, '.' + clean);
  if (full !== ROOT && !full.startsWith(ROOT + path.sep)) {
    throw new Error("not a valid path")
  }
  return full
}

export function validName(name?: string) {
  if (!name || /[\\/]/.test(name) || name.startsWith('.')) {
    throw new Error('invalid name')
  }
}

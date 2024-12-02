import { readFileSync } from 'fs';
import { join } from 'path';

export function readInput(year: number, day: number): string {
  const inputPath = join(process.cwd(), 'src', String(year), 'inputs', `day${day}.txt`);
  return readFileSync(inputPath, 'utf-8').trim();
}
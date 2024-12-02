import { sum } from '../utils/array-utils';
import { readInput } from '../utils/input-reader';

type SimilarityMap = Map<number, number>

export function day1() {
  const input = readInput(2024, 1);
  const left: number[] = [];
  const right: number[] = [];

  input.split('\n').forEach(line => {
    const [leftNumber, rightNumber] = line.trim().split(/\s+/).map(Number);
    left.push(leftNumber);
    right.push(rightNumber);
  });
  
  function part1(): number {
    const leftSorted = left.sort((a, b) => a - b);
    const rightSorted = right.sort((a, b) => a - b);
    const distances = []

    for (let i = 0; i < leftSorted.length; i++) {
      const distance = leftSorted[i] - rightSorted[i];
      distances.push(Math.abs(distance));
    }

    const answer = sum(distances);
    return answer;
  }
  
  function part2(): number {
    const similarityMap: SimilarityMap = new Map();
    right.forEach(value => {
        const prevAmount = similarityMap.get(value);
        !prevAmount ? similarityMap.set(value, 1) : similarityMap.set(value, prevAmount + 1);
    })
    const similarityScores: number[] = [];
    
    left.forEach(value => {
      const score = similarityMap.get(value);
      similarityScores.push((score || 0) * value);
    })

    const answer = sum(similarityScores);
    return answer;
  }
  
  console.log('Day 1 Solutions:');
  console.log('Part 1:', part1());
  console.log('Part 2:', part2());
}
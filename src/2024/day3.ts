import { sum } from '../utils/array-utils';
import { readInput } from '../utils/input-reader';

export function day3() {
  const input = readInput(2024, 3);
  
  function part1(): number {
    const matches = input.match(/mul\(\d{1,3},\d{1,3}\)/g);
    const values = matches!.map(value => {
        const match = value.match(/mul\((\d+),(\d+)\)/);
        if (match) {
            const num1 = parseInt(match[1], 10);
            const num2 = parseInt(match[2], 10);
            return num1 * num2;
        } else {
            return 0;
        }
    })

    const answer = sum(values);
    return answer;
  }
  
  function part2(): number {
    const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
    const matches = input.match(regex);

    let isEnabled = true; 
    let totalSum = 0;
    
    if (matches) {
        for (const match of matches) {
            if (match === "do()") {
                isEnabled = true;
            } else if (match === "don't()") {
                isEnabled = false;
            } else if (isEnabled && match.startsWith("mul(")) {
                
                const valueMatch = match.match(/mul\((\d+),(\d+)\)/);
                if (valueMatch) {
                    const num1 = parseInt(valueMatch[1], 10);
                    const num2 = parseInt(valueMatch[2], 10);
                    totalSum += num1 * num2; 
                }
            }
        }
    }

    return totalSum;
  }
  
  console.log('Day 3 Solutions:');
  console.log('Part 1:', part1());
  console.log('Part 2:', part2());
}
import { readInput } from '../utils/input-reader';

export function day2() {
  const input = readInput(2024, 2);
  const reports: number[][] = [];

  input.split('\n').forEach(line => {
    const levels = line.trim().split(/\s+/).map(Number);
    reports.push(levels);
  });

  const isSafeDifference = (diff: number): boolean => diff >= 1 && diff <= 3;

  const check = (levels: number[]): { isValid: boolean, validTransitions: number } => {
    if (levels.length < 2) {
        return { isValid: false, validTransitions: 0 };
    }

    let isConsistentTrend = true;
    let isIncreasing = levels[0] < levels[1];
        
    const validTransitions = levels.reduce((acc, currentValue, index) => {
            if (index === levels.length - 1) return acc;

            const diff = levels[index + 1] - currentValue;
            const isCurrentIncreasing = diff > 0;
            
            if (isCurrentIncreasing !== isIncreasing) {
                isConsistentTrend = false;
                return acc;
            }
            
            if (isSafeDifference(Math.abs(diff))) {
                return acc + 1;
            }
            
            isConsistentTrend = false;
            return acc;
    }, 0);

    return { isValid: isConsistentTrend, validTransitions };
}

  function part1(): number {
    let count = 0;

    reports.forEach(levels => {
        const {isValid, validTransitions } = check(levels);

        if (isValid && validTransitions === levels.length - 1) {
            count++;
        }
    })
    return count;
  }
  
  function part2(): number {
    let count = 0;

    reports.forEach(levels => {
        const {isValid, validTransitions } = check(levels);

        if (isValid && validTransitions === levels.length - 1) {
            count++;
            return;
        }

        for (let i = 0; i < levels.length; i++) {
            const newLevels = [...levels];
            newLevels.splice(i, 1);

            const { isValid: newIsValid, validTransitions: newValidTransitions } = check(newLevels);

            if (newIsValid && newValidTransitions === newLevels.length - 1) {
                count++;
                return;
            }
        }
    })

    return count;
  }
  
  console.log('Day 2 Solutions:');
  console.log('Part 1:', part1());
  console.log('Part 2:', part2());
}
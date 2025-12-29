
export interface Lesson {
    id: string;
    category: 'algebra' | 'geometry' | 'physics';
    title: string;
    description: string;
    content: {
        formula: string;
        text: string;
        example: string;
    }[];
}

export const LESSONS: Lesson[] = [
    {
        id: 'linear_eq',
        category: 'algebra',
        title: 'Linear Equations',
        description: 'Basics of y = mx + b',
        content: [
            {
                formula: 'y = mx + b',
                text: 'A linear equation represents a straight line. "m" is the slope (gradient) and "b" is the y-intercept (where the line crosses the Y axis).',
                example: 'If y = 2x + 1, then the slope is 2 and the line starts at 1 on the Y axis.'
            }
        ]
    },
    {
        id: 'quad_eq',
        category: 'algebra',
        title: 'Quadratic Formula',
        description: 'Solving ax² + bx + c = 0',
        content: [
            {
                formula: 'x = (-b ± √(b² - 4ac)) / 2a',
                text: 'The quadratic formula provides the solution(s) to a quadratic equation. The term inside the square root (b² - 4ac) is called the discriminant.',
                example: 'For x² - 3x + 2 = 0: a=1, b=-3, c=2. Roots are 2 and 1.'
            }
        ]
    },
    {
        id: 'circle_area',
        category: 'geometry',
        title: 'Circle Properties',
        description: 'Area and Circumference',
        content: [
            {
                formula: 'Area = πr²',
                text: 'The area of a circle is Pi multiplied by the radius squared.',
                example: 'If r = 3, Area = 9π ≈ 28.27'
            },
            {
                formula: 'Circumference = 2πr',
                text: 'The distance around the circle.',
                example: 'If r = 3, C = 6π ≈ 18.85'
            }
        ]
    },
    {
        id: 'newton_2',
        category: 'physics',
        title: 'Newton\'s Second Law',
        description: 'Force, Mass, and Acceleration',
        content: [
            {
                formula: 'F = m × a',
                text: 'Force equals mass times acceleration. It means the more mass an object has, the more force is needed to accelerate it.',
                example: 'To accelerate a 10kg mass by 2m/s², you need 20 Newtons of force.'
            }
        ]
    }
];

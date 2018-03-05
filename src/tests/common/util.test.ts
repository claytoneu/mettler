import { intersectArrays as intersectArrays } from '../../common/util';
import { transposeArray as transposeArray } from '../../common/util';

describe("Array Utils", () => {
    it('should return the intersection of 2 arrays', () => {
        let a = [3, 2, 1, 0];
        let b = [2, 3, 4, 5];

        let intersection = intersectArrays(a, b);
        
        expect(intersection).toContain(2);
        expect(intersection).toContain(3);
    });

    it('should return a transposed 2D array', () => {
        let a = [
            [1, 2, 3],
            [4, 5, 6]
        ];

        let transA = transposeArray(a);
        let expectedTransA = [
            [1, 4], 
            [2, 5], 
            [3, 6],
        ];

        expect(transA).toEqual(expect.arrayContaining(expectedTransA));
    })
});


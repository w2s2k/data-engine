describe('Sort', () => {
    let Sort;
    beforeEach(() => {
        jest.resetModules();
        Sort = require('data-sort');
    });
    it('Create Sort object', () => {
        const sort = new Sort();
        expect(sort).toBeInstanceOf(Sort);
    });
    it('Create Sort object', () => {
        const sort = new Sort({ sortFunction: (a, b) => (a > b ? 1 : -1), direction: true, });
        expect(sort.Direction).toBe(true);
        expect(sort.PrimaryKey).toBe(null);
        expect(sort.SortFunction).not.toBeNull();
    });
    let arr = [
        { a: 'z', },
        { a: 'a', },
        { a: 'y', },
        { a: 'b', },
        { a: 'x', },
        { a: 'q', }
    ];
    it('should sort item', () => {
        const sort = new Sort({ data: arr, direction: true, });
        const a = sort.sortBy('a');
        expect(a[0].a).toBe('a');
        expect(a[a.length - 1].a).toBe('z');
    });

    it('should sort item', () => {
        const sort = new Sort({ data: arr, direction: false, });
        const a = sort.sortBy('a');
        expect(a[0].a).toBe('z');
        expect(a[a.length - 1].a).toBe('a');
    });
    arr = [
        { a: 'z', b: 'a', },
        { a: 'z', b: 'b', },
        { a: 'a', b: 'z', },
        { a: 'x', b: 'y', },
        { a: 'y', b: 'a', },
        { a: 'u', b: 'y', },
        { a: 'x', b: 'a', },
        { a: 'i', b: 'v', },
        { a: 'j', b: 'h', }
    ];
    it('should sort item', () => {
        const sort = new Sort({ data: arr, primaryKey: 'b', });
        const a = sort.sortBy('a');
        const tobe = [{ a: 'a', b: 'z', },
            { a: 'i', b: 'v', },
            { a: 'j', b: 'h', },
            { a: 'u', b: 'y', },
            { a: 'x', b: 'a', },
            { a: 'x', b: 'y', },
            { a: 'y', b: 'a', },
            { a: 'z', b: 'a', },
            { a: 'z', b: 'b', }];
        expect(a).toEqual(tobe);
    });

    it('should sort item', () => {
        const sort = new Sort({ data: arr, direction: false, primaryKey: 'b', });
        const a = sort.sortBy('a');
        const tobe = [{ a: 'z', b: 'b', },
            { a: 'z', b: 'a', },
            { a: 'y', b: 'a', },
            { a: 'x', b: 'y', },
            { a: 'x', b: 'a', },
            { a: 'u', b: 'y', },
            { a: 'j', b: 'h', },
            { a: 'i', b: 'v', },
            { a: 'a', b: 'z', }];
        expect(a).toEqual(tobe);
    });
    it('should sort item', () => {
        const sort = new Sort({ data: arr, primaryKey: 'b', });
        sort.sortBy('a');
        const a = sort.sortBy('a');
        const tobe = [{ a: 'z', b: 'b', },
            { a: 'z', b: 'a', },
            { a: 'y', b: 'a', },
            { a: 'x', b: 'y', },
            { a: 'x', b: 'a', },
            { a: 'u', b: 'y', },
            { a: 'j', b: 'h', },
            { a: 'i', b: 'v', },
            { a: 'a', b: 'z', }];
        expect(a).toEqual(tobe);
    });
    it('should sort item', () => {
        const sort = new Sort({ data: arr, direction: false, primaryKey: 'b', });
        sort.sortBy('a');
        const a = sort.sortBy('a');
        const tobe = [{ a: 'a', b: 'z', },
            { a: 'i', b: 'v', },
            { a: 'j', b: 'h', },
            { a: 'u', b: 'y', },
            { a: 'x', b: 'a', },
            { a: 'x', b: 'y', },
            { a: 'y', b: 'a', },
            { a: 'z', b: 'a', },
            { a: 'z', b: 'b', }];
        expect(a).toEqual(tobe);
    });
});

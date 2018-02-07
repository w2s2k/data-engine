/**
 * @providesModule Filter
 */

import FilterValue from 'filter-value';
import Sort from 'data-sort';

/**
 * Filter engine
 *
 * @class Filter
 */
export default class Filter {
    updateFce = this.filterWOSort;
    /**
     * Creates an instance of Filter.
     * @param {any} data - initial data
     *
     * @memberOf Filter
     */
    constructor(data = null, sortEngine = null) {
        this.filtered = data;
        this.filters = {};
        this.SortEngine = sortEngine;
        this.Data = data;
    }
    /**
     * Setter for data
     *
     * @param {Array} data new data
     * @memberOf Filter
     */
    setData = (data) => {
        this.data = data;
        return this.updateFilter();
    }
    /**
     * Setter for data
     *
     * @param {Array} data new data
     * @memberOf Filter
     */
    set Data(data) {
        this.setData(data);
    }
    /**
     * Setter for data
     *
     * @param {Array} data new data
     * @memberOf Filter
     */
    get Data() {
        return this.data;
    }

    /**
     * Add or modify filter value
     *
     *
     * @param {Array} items - array of filter items
     * @throws {TypeError} when item isn't instance of FilterValue
     * @return {Array} new filtered array
     * @memberOf Filter
     */
    update = (...items) => {
        let returnFunc = this.getFilteredData;
        items.forEach((item) => {
            // Exception when item isn't filterValue!
            if (!(item instanceof FilterValue)) {
                throw new TypeError(`${item} has to have filterValue instance`);
            }
            this.filters[item.Name] = item;
            returnFunc = this.updateFilter;
        });
        return returnFunc();
    }
    /**
     * Remove one or as many filters as you add value
     * only updating when at least one filter was removed
     * @param {object} item - filter item
     *
     * @return {Array} new filtered array
     * @memberOf Filter
     */
    removeFilters = (...names) => {
        let returnFunc = this.getFilteredData;
        names.forEach((item) => {
            const removalName = typeof item === 'string' ? item : item.Name;
            if (this.filters[removalName]) {
                delete this.filters[removalName];
                returnFunc = this.updateFilter;
            }
        });
        return returnFunc();
    }
    /**
     * Clears all filters
     *
     * @return {Array} new filtered array
     * @memberOf Filter
     */
    clearFilters = () => {
        this.filters = {};
        this.filtered = this.data;
        return this.getFilteredData();
    }
    /**
     * Update filtered array.
     *
     * @return {Array} new filtered array
     * @memberOf Filter
     */
    updateFilter = () => {
        if (this.data === null) {
            throw new Error('Data are null and cannot be filtered!');
        }
        this.filtered = this.data.filter(this.filterAll);
        return this.getFilteredData();
    }

    /**
     * Filter line by all criteria.
     *
     * @param {object} line - line from original data.
     *
     * @return {bool}
     * @memberOf Filter
     */
    filterAll = line => Object.keys(this.filters)
        .every(key => this.filters[key].compare(line[key]));
    /**
     * Simple getter
     *
     * @returns {array} filtered data
     *
     * @memberOf Filter
     */
    getFilteredData = () => this.updateFce();
    /**
     * Simple getter
     *
     * @returns {array} filtered data
     *
     * @memberOf Filter
     */
    get FilteredData() {
        return this.getFilteredData();
    }
    /**
     * Helper function when sort is not in filter
     */
    filterWOSort = () => this.filtered
    /**
     * Helper function with sort;
     */
    filterWSort = () => this.SortEngine.setData(this.filtered)
    /**
     * Getter for filter
     * @returns {FilterValue | null} return filter value
     */
    getFilter = (name) => {
        if (this.filters[name]) {
            return this.filters[name];
        }
        return null;
    }
    /**
     * Setter for sort engine
     * @param {Sort} sortEngine - instance of Sort
     */
    set SortEngine(sortEngine) {
        if (sortEngine instanceof Sort) {
            this.sortEngine = sortEngine;
            this.updateFce = this.filterWSort;
        } else {
            this.sortEngine = null;
            this.updateFce = this.filterWOSort;
        }
    }
    /**
     * Getter for sort engine
     * @returns {Sort} - instance of Sort
     */
    get SortEngine() {
        return this.sortEngine;
    }
}


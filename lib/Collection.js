import {Events} from './Events';

export class Collection extends Events {

    /**
     * @param {{}} [models]
     * @param {{}} [options]
     */
    constructor(models, options) {
        super();

        this.models = [];
        this._index = {};

        if (options) {
            Object.assign(this, options);
        }

        if (this.initialize) {
            this.initialize();
        }
    }

    /**
     * @param {{data: {}}} params
     * 
     * @returns {Promise}
     */
    fetch(params = {}) {
        let url = this.url;

        let options = {
            headers: {
                'Accept': 'application/json'//,
                // 'Content-Type': 'application/json'
            }
        };

        if (params.query) {
            let arr = Object.keys(params.query).map(key => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(params.query[key])}`;
            });

            if (arr.length) {
                url += '?' + arr.join('&');
            }
        }

        return fetch(url, options)
            .then(response => this.checkStatus(response))
            .then(response => response.json())
            .then(response => this.processResponse(response, params));
    }

    /**
     * @param {[]} response
     * @param {{}} params
     *
     * @returns {*}
     */
    processResponse(response, params) {
        return this.mergeModels(this.parse(response, params), params);
    }

    /**
     * @param {Response} response
     * @returns {*}
     */
    checkStatus(response) {
        if (response.status !== 200) {
            throw new Error('Response status was ' + response.status);
        }

        return response;
    }

    /**
     * @param {{}[]} models
     * @param {{}} [params]
     */
    mergeModels(models, params = {}) {
        let Model = this.model,
            idAttribute = Model.prototype.idAttribute,
            addChannel = this.channel('add'),
            currentModels = params.remove ? this.models.slice() : null,
            newModels = [],
            toAdd = [];

        for (let index = 0; index < models.length; index++) {
            let attrs = models[index],
                id = attrs[idAttribute],
                previous = this._index[id];

            // Merge
            if (previous) {
                let index = currentModels.indexOf(previous);
                currentModels.splice(index, 1);

                previous.setAttrs(attrs);

                newModels.push(previous);
            } else {
                let model = new Model(attrs);
                this._index[id] = model;
                newModels.push(model);
                toAdd.push(model);
            }
        }

        this.models = newModels;

        for (let index = 0; index < currentModels.length; index++) {
            this.remove(currentModels[index]);
        }

        for (let index = 0; index < toAdd.length; index++) {
            addChannel.emit(toAdd[index]);
        }

        this.channel('update').emit(this);
    }

    /**
     * @param {Model} model
     */
    remove(model) {
        let index = this.models.indexOf(model),
            idAttribute = this.model.prototype.idAttribute;

        if (index > -1) {
            this.models.splice(index, 1);
        }

        this._index[model[idAttribute]] = undefined;

        this.channel('remove').emit(model);
    }

    /**
     * @param {function} callback
     *
     * @returns {[]}
     */
    map(callback) {
        return this.models.map(callback);
    }

    /**
     * @param {{}} data
     * @returns {*}
     */
    parse(data) {
        return data;
    }

}
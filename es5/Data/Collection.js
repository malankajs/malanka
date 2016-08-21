'use strict';

exports.__esModule = true;
exports.Collection = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _Model = require('./Model');

var _Events2 = require('./Events');

var _Prototype = require('../Decorators/Prototype');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Collection = exports.Collection = (_dec = (0, _Prototype.Prototype)({
    Model: _Model.Model
}), _dec(_class = function (_Events) {
    (0, _inherits3.default)(Collection, _Events);

    /**
     * @param {{}[]} [models]
     * @param {{}} [options]
     */
    function Collection(models, options) {
        (0, _classCallCheck3.default)(this, Collection);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Events.call(this));

        _this.models = [];
        _this._index = {};

        if (options) {
            Object.assign(_this, options);
        }

        if (models) {
            _this.mergeModels(models, { silent: true });
        }

        if (_this.initialize) {
            _this.initialize(models, options);
        }
        return _this;
    }

    /**
     * @param {{data: {}, [query]: {}}} params
     *
     * @returns {Promise<Collection>}
     */


    Collection.prototype.fetch = function fetch() {
        var _this2 = this;

        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var options = {
            url: params.url || this.url,
            query: params.query || {}
        };

        if (!params.force) {
            if (this.isQueriesSame(options.query)) {
                return Promise.resolve(this);
            }
        }

        return this._promise = this.getRequest().request(options).then(function (response) {
            return _this2.processResponse(response, params);
        }).then(function () {
            _this2._lastQuery = options.query;

            return _this2;
        });
    };

    /**
     * @param {[]} response
     * @param {{}} params
     *
     * @returns {*}
     */


    Collection.prototype.processResponse = function processResponse(response, params) {
        return this.mergeModels(this.parse(response, params), params);
    };

    /**
     * @param {{}[]} models
     * @param {{}} [params]
     */


    Collection.prototype.mergeModels = function mergeModels(models) {
        var _this3 = this;

        var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var Model = this.Model,
            silent = params.silent,
            reset = params.reset,
            remove = reset || params.remove,
            idAttribute = Model.prototype.idAttribute,
            addChannel = this.channel('add'),
            currentModels = this.models.slice(),
            newModels = [],
            toAdd = [];

        for (var index = 0; index < models.length; index++) {
            var attrs = models[index],
                isModel = models[index] instanceof Model,
                id = attrs[idAttribute],
                previous = id && this._index[id];

            // Merge
            if (previous) {
                var _index = currentModels.indexOf(previous);
                currentModels.splice(_index, 1);

                if (!isModel) {
                    previous.setAttrs(attrs);
                }

                newModels.push(previous);
            } else {
                var model = isModel ? attrs : Model.dataFactory(attrs, {
                    request: this.getRequest()
                });

                this._index[model[idAttribute]] = model;
                newModels.push(model);
                toAdd.push(model);

                this.listenModel(model);
            }
        }

        if (remove) {
            this.models = newModels;

            for (var _index2 = 0; _index2 < currentModels.length; _index2++) {
                this.remove(currentModels[_index2], { silent: silent || reset });
            }
        } else {
            this.models = currentModels.concat(newModels);
        }

        if (this.comparator && newModels.length) {
            if (this.comparator.length === 2) {
                this.models.sort(this.comparator);
            } else {
                this.models.sort(function (a, b) {
                    return _this3.comparator(a) - _this3.comparator(b);
                });
            }
        }

        if (!silent && !reset) {
            for (var _index3 = 0; _index3 < toAdd.length; _index3++) {
                addChannel.emit(toAdd[_index3]);
            }

            this.channel('update').emit(this);
        }

        if (reset) {
            this.channel('reset').emit(this);
        }

        this.emit(this.models);

        return toAdd;
    };

    /**
     * @param {Model|{}} model
     * @param {{}} options
     */


    Collection.prototype.remove = function remove(model) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var index = this.models.indexOf(model),
            idAttribute = this.Model.prototype.idAttribute;

        if (index > -1) {
            this.models.splice(index, 1);
        }

        this._index[model[idAttribute]] = undefined;
        this.stopListening(model);

        if (!options.reset) {
            this.channel('remove').emit(model);
        }
    };

    /**
     * @param {{}} attrs
     * @param {{}} [options]
     */


    Collection.prototype.add = function add(attrs, options) {
        var models = this.mergeModels([attrs], options);

        return models[0];
    };

    /**
     * @param {{}} attrs
     * @param {{}} [options]
     */


    Collection.prototype.create = function create(attrs, options) {
        return this.add(attrs, options).save(options);
    };

    /**
     * @param {Model} model
     */


    Collection.prototype.listenModel = function listenModel(model) {
        var _this4 = this;

        this.listenTo(model, function (model, key) {
            _this4.channel('change:' + key).emit(model);
        });

        this.listenTo(model.channel('remove'), function (model) {
            _this4.remove(model);
        });
    };

    /**
     * @param {function} callback
     *
     * @returns {[]}
     */


    Collection.prototype.map = function map(callback) {
        return this.models.map(callback);
    };

    /**
     * @param {function} callback
     */


    Collection.prototype.forEach = function forEach(callback) {
        this.models.forEach(callback);
    };

    /**
     * @param {function} callback
     * 
     * @returns {Model}
     */


    Collection.prototype.find = function find(callback) {
        return this.models.find(callback);
    };

    /**
     * @param {function} callback
     *
     * @returns {boolean}
     */


    Collection.prototype.every = function every(callback) {
        return this.models.every(callback);
    };

    /**
     * @returns {Model}
     */


    Collection.prototype.first = function first() {
        return this.models[0];
    };

    /**
     * @param {Model} model
     *
     * @returns {number}
     */


    Collection.prototype.indexOf = function indexOf(model) {
        return this.models.indexOf(model);
    };

    /**
     * @returns {number}
     */


    /**
     * @param {{}} query
     * @returns {boolean}
     */
    Collection.prototype.isQueriesSame = function isQueriesSame(query) {
        return JSON.stringify(query) === JSON.stringify(this._lastQuery);
    };

    /**
     * @param {{}} data
     * @param {{}} params
     *
     * @returns {*}
     */


    Collection.prototype.parse = function parse(data, params) {
        return data;
    };

    /**
     * @returns {AbstractRequest}
     */


    Collection.prototype.getRequest = function getRequest() {
        return this.request;
    };

    /**
     * @returns {Model[]}
     */


    Collection.prototype.getValue = function getValue() {
        return this.models;
    };

    /**
     * @param {string} name
     *
     * @returns {ValueProxy}
     */


    Collection.prototype.proxy = function proxy(name) {
        return this[name];
    };

    /**
     * Wait for complete last promise
     *
     * @returns {ValueProxy}
     */


    Collection.prototype.async = function async() {
        return this._promise;
    };

    /**
     * Default destroy
     */


    Collection.prototype.destroy = function destroy() {
        this.stopListening();
        this.off();
        this.models = [];
    };

    /**
     * @returns {{}}
     */


    Collection.prototype.serialize = function serialize() {
        var models = this.models.map(function (model) {
            return model.serialize();
        });

        return {
            query: this._lastQuery,
            models: models
        };
    };

    /**
     * @param {{}[]} models
     * @param {{}} query
     * @param {{}} dependencies
     *
     * @returns {Model}
     */


    Collection.restore = function restore(_ref, dependencies) {
        var models = _ref.models;
        var query = _ref.query;

        var Model = this.prototype.Model,
            modelsInstances = models.map(function (model) {
            return Model.restore(model, dependencies);
        }),
            instance = this.dataFactory(modelsInstances, dependencies);

        instance._lastQuery = query;

        return instance;
    };

    /**
     * @param {{}} options
     * @returns {Model}
     */


    Collection.factory = function factory(options) {
        return this.dataFactory(null, options);
    };

    /**
     * @param {{}|null} data
     * @param {{}} [options]
     *
     * @returns {Model}
     */


    Collection.dataFactory = function dataFactory(data, options) {
        return new this(data, options);
    };

    (0, _createClass3.default)(Collection, [{
        key: 'length',
        get: function get() {
            return this.models.length;
        }
    }]);
    return Collection;
}(_Events2.Events)) || _class);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9EYXRhL0NvbGxlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztJQUthLFUsV0FBQSxVLFdBSFosMEJBQVU7QUFDUDtBQURPLENBQVYsQzs7O0FBS0c7Ozs7QUFJQSx3QkFBWSxNQUFaLEVBQW9CLE9BQXBCLEVBQTZCO0FBQUE7O0FBQUEsbUVBQ3pCLGtCQUR5Qjs7QUFHekIsY0FBSyxNQUFMLEdBQWMsRUFBZDtBQUNBLGNBQUssTUFBTCxHQUFjLEVBQWQ7O0FBRUEsWUFBSSxPQUFKLEVBQWE7QUFDVCxtQkFBTyxNQUFQLFFBQW9CLE9BQXBCO0FBQ0g7O0FBRUQsWUFBSSxNQUFKLEVBQVk7QUFDUixrQkFBSyxXQUFMLENBQWlCLE1BQWpCLEVBQXlCLEVBQUMsUUFBUSxJQUFULEVBQXpCO0FBQ0g7O0FBRUQsWUFBSSxNQUFLLFVBQVQsRUFBcUI7QUFDakIsa0JBQUssVUFBTCxDQUFnQixNQUFoQixFQUF3QixPQUF4QjtBQUNIO0FBaEJ3QjtBQWlCNUI7O0FBRUQ7Ozs7Ozs7eUJBS0EsSyxvQkFBbUI7QUFBQTs7QUFBQSxZQUFiLE1BQWEseURBQUosRUFBSTs7QUFDZixZQUFJLFVBQVU7QUFDVixpQkFBSyxPQUFPLEdBQVAsSUFBYyxLQUFLLEdBRGQ7QUFFVixtQkFBTyxPQUFPLEtBQVAsSUFBZ0I7QUFGYixTQUFkOztBQUtBLFlBQUksQ0FBQyxPQUFPLEtBQVosRUFBbUI7QUFDZixnQkFBSSxLQUFLLGFBQUwsQ0FBbUIsUUFBUSxLQUEzQixDQUFKLEVBQXVDO0FBQ25DLHVCQUFPLFFBQVEsT0FBUixDQUFnQixJQUFoQixDQUFQO0FBQ0g7QUFDSjs7QUFFRCxlQUFPLEtBQUssUUFBTCxHQUFnQixLQUFLLFVBQUwsR0FBa0IsT0FBbEIsQ0FBMEIsT0FBMUIsRUFDbEIsSUFEa0IsQ0FDYjtBQUFBLG1CQUFZLE9BQUssZUFBTCxDQUFxQixRQUFyQixFQUEr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QSxpQkFBUyxVQUFULEdBQXNCLEtBQXRCOztBQUVBLGVBQU8sUUFBUDtBQUNILEs7O0FBRUQ7Ozs7OztlQUlPLE8sb0JBQVEsTyxFQUFTO0FBQ3BCLGVBQU8sS0FBSyxXQUFMLENBQWlCLElBQWpCLEVBQXVCLE9BQXZCLENBQVA7QUFDSCxLOztBQUVEOzs7Ozs7OztlQU1PLFcsd0JBQVksSSxFQUFNLE8sRUFBUztBQUM5QixlQUFPLElBQUksSUFBSixDQUFTLElBQVQsRUFBZSxPQUFmLENBQVA7QUFDSCxLOzs7OzRCQTVHWTtBQUNULG1CQUFPLEtBQUssTUFBTCxDQUFZLE1BQW5CO0FBQ0giLCJmaWxlIjoiQ29sbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kZWx9IGZyb20gJy4vTW9kZWwnO1xuaW1wb3J0IHtFdmVudHN9IGZyb20gJy4vRXZlbnRzJztcbmltcG9ydCB7UHJvdG90eXBlfSBmcm9tICcuLi9EZWNvcmF0b3JzL1Byb3RvdHlwZSc7XG5cbkBQcm90b3R5cGUoe1xuICAgIE1vZGVsXG59KVxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb24gZXh0ZW5kcyBFdmVudHMge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7fVtdfSBbbW9kZWxzXVxuICAgICAqIEBwYXJhbSB7e319IFtvcHRpb25zXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1vZGVscywgb3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMubW9kZWxzID0gW107XG4gICAgICAgIHRoaXMuX2luZGV4ID0ge307XG5cbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9kZWxzKSB7XG4gICAgICAgICAgICB0aGlzLm1lcmdlTW9kZWxzKG1vZGVscywge3NpbGVudDogdHJ1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZSkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKG1vZGVscywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3tkYXRhOiB7fSwgW3F1ZXJ5XToge319fSBwYXJhbXNcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPENvbGxlY3Rpb24+fVxuICAgICAqL1xuICAgIGZldGNoKHBhcmFtcyA9IHt9KSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdXJsOiBwYXJhbXMudXJsIHx8IHRoaXMudXJsLFxuICAgICAgICAgICAgcXVlcnk6IHBhcmFtcy5xdWVyeSB8fCB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghcGFyYW1zLmZvcmNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1F1ZXJpZXNTYW1lKG9wdGlvbnMucXVlcnkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlID0gdGhpcy5nZXRSZXF1ZXN0KCkucmVxdWVzdChvcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gdGhpcy5wcm9jZXNzUmVzcG9uc2UocmVzcG9uc2UsIHBhcmFtcykpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdFF1ZXJ5ID0gb3B0aW9ucy5xdWVyeTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7W119IHJlc3BvbnNlXG4gICAgICogQHBhcmFtIHt7fX0gcGFyYW1zXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBwcm9jZXNzUmVzcG9uc2UocmVzcG9uc2UsIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXJnZU1vZGVscyh0aGlzLnBhcnNlKHJlc3BvbnNlLCBwYXJhbXMpLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e31bXX0gbW9kZWxzXG4gICAgICogQHBhcmFtIHt7fX0gW3BhcmFtc11cbiAgICAgKi9cbiAgICBtZXJnZU1vZGVscyhtb2RlbHMsIHBhcmFtcyA9IHt9KSB7XG4gICAgICAgIGxldCBNb2RlbCA9IHRoaXMuTW9kZWwsXG4gICAgICAgICAgICBzaWxlbnQgPSBwYXJhbXMuc2lsZW50LFxuICAgICAgICAgICAgcmVzZXQgPSBwYXJhbXMucmVzZXQsXG4gICAgICAgICAgICByZW1vdmUgPSByZXNldCB8fCBwYXJhbXMucmVtb3ZlLFxuICAgICAgICAgICAgaWRBdHRyaWJ1dGUgPSBNb2RlbC5wcm90b3R5cGUuaWRBdHRyaWJ1dGUsXG4gICAgICAgICAgICBhZGRDaGFubmVsID0gdGhpcy5jaGFubmVsKCdhZGQnKSxcbiAgICAgICAgICAgIGN1cnJlbnRNb2RlbHMgPSB0aGlzLm1vZGVscy5zbGljZSgpLFxuICAgICAgICAgICAgbmV3TW9kZWxzID0gW10sXG4gICAgICAgICAgICB0b0FkZCA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBtb2RlbHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgYXR0cnMgPSBtb2RlbHNbaW5kZXhdLFxuICAgICAgICAgICAgICAgIGlzTW9kZWwgPSBtb2RlbHNbaW5kZXhdIGluc3RhbmNlb2YgTW9kZWwsXG4gICAgICAgICAgICAgICAgaWQgPSBhdHRyc1tpZEF0dHJpYnV0ZV0sXG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSBpZCAmJiB0aGlzLl9pbmRleFtpZF07XG5cbiAgICAgICAgICAgIC8vIE1lcmdlXG4gICAgICAgICAgICBpZiAocHJldmlvdXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBjdXJyZW50TW9kZWxzLmluZGV4T2YocHJldmlvdXMpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRNb2RlbHMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgICAgICAgIGlmICghaXNNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5zZXRBdHRycyhhdHRycyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbmV3TW9kZWxzLnB1c2gocHJldmlvdXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kZWwgPSBpc01vZGVsID8gYXR0cnMgOiBNb2RlbC5kYXRhRmFjdG9yeShhdHRycywge1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiB0aGlzLmdldFJlcXVlc3QoKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5faW5kZXhbbW9kZWxbaWRBdHRyaWJ1dGVdXSA9IG1vZGVsO1xuICAgICAgICAgICAgICAgIG5ld01vZGVscy5wdXNoKG1vZGVsKTtcbiAgICAgICAgICAgICAgICB0b0FkZC5wdXNoKG1vZGVsKTtcblxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuTW9kZWwobW9kZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlbW92ZSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbHMgPSBuZXdNb2RlbHM7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjdXJyZW50TW9kZWxzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGN1cnJlbnRNb2RlbHNbaW5kZXhdLCB7c2lsZW50OiBzaWxlbnQgfHwgcmVzZXR9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxzID0gY3VycmVudE1vZGVscy5jb25jYXQobmV3TW9kZWxzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbXBhcmF0b3IgJiYgbmV3TW9kZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29tcGFyYXRvci5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVscy5zb3J0KHRoaXMuY29tcGFyYXRvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWxzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcGFyYXRvcihhKSAtIHRoaXMuY29tcGFyYXRvcihiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2lsZW50ICYmICFyZXNldCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRvQWRkLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGFkZENoYW5uZWwuZW1pdCh0b0FkZFtpbmRleF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNoYW5uZWwoJ3VwZGF0ZScpLmVtaXQodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzZXQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbCgncmVzZXQnKS5lbWl0KHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0KHRoaXMubW9kZWxzKTtcblxuICAgICAgICByZXR1cm4gdG9BZGQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtNb2RlbHx7fX0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3t9fSBvcHRpb25zXG4gICAgICovXG4gICAgcmVtb3ZlKG1vZGVsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5tb2RlbHMuaW5kZXhPZihtb2RlbCksXG4gICAgICAgICAgICBpZEF0dHJpYnV0ZSA9IHRoaXMuTW9kZWwucHJvdG90eXBlLmlkQXR0cmlidXRlO1xuXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVscy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5kZXhbbW9kZWxbaWRBdHRyaWJ1dGVdXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdG9wTGlzdGVuaW5nKG1vZGVsKTtcblxuICAgICAgICBpZiAoIW9wdGlvbnMucmVzZXQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbCgncmVtb3ZlJykuZW1pdChtb2RlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9fSBhdHRyc1xuICAgICAqIEBwYXJhbSB7e319IFtvcHRpb25zXVxuICAgICAqL1xuICAgIGFkZChhdHRycywgb3B0aW9ucykge1xuICAgICAgICB2YXIgbW9kZWxzID0gdGhpcy5tZXJnZU1vZGVscyhbYXR0cnNdLCBvcHRpb25zKTtcblxuICAgICAgICByZXR1cm4gbW9kZWxzWzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e319IGF0dHJzXG4gICAgICogQHBhcmFtIHt7fX0gW29wdGlvbnNdXG4gICAgICovXG4gICAgY3JlYXRlKGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZChhdHRycywgb3B0aW9ucykuc2F2ZShvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge01vZGVsfSBtb2RlbFxuICAgICAqL1xuICAgIGxpc3Rlbk1vZGVsKG1vZGVsKSB7XG4gICAgICAgIHRoaXMubGlzdGVuVG8obW9kZWwsIChtb2RlbCwga2V5KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5uZWwoJ2NoYW5nZTonICsga2V5KS5lbWl0KG1vZGVsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5Ubyhtb2RlbC5jaGFubmVsKCdyZW1vdmUnKSwgbW9kZWwgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUobW9kZWwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqXG4gICAgICogQHJldHVybnMge1tdfVxuICAgICAqL1xuICAgIG1hcChjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHMubWFwKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIGZvckVhY2goY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5tb2RlbHMuZm9yRWFjaChjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7TW9kZWx9XG4gICAgICovXG4gICAgZmluZChjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHMuZmluZChjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGV2ZXJ5KGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVscy5ldmVyeShjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge01vZGVsfVxuICAgICAqL1xuICAgIGZpcnN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtNb2RlbH0gbW9kZWxcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgaW5kZXhPZihtb2RlbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHMuaW5kZXhPZihtb2RlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHMubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e319IHF1ZXJ5XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNRdWVyaWVzU2FtZShxdWVyeSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocXVlcnkpID09PSBKU09OLnN0cmluZ2lmeSh0aGlzLl9sYXN0UXVlcnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e319IGRhdGFcbiAgICAgKiBAcGFyYW0ge3t9fSBwYXJhbXNcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIHBhcnNlKGRhdGEsIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7QWJzdHJhY3RSZXF1ZXN0fVxuICAgICAqL1xuICAgIGdldFJlcXVlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge01vZGVsW119XG4gICAgICovXG4gICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVscztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZhbHVlUHJveHl9XG4gICAgICovXG4gICAgcHJveHkobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXYWl0IGZvciBjb21wbGV0ZSBsYXN0IHByb21pc2VcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWYWx1ZVByb3h5fVxuICAgICAqL1xuICAgIGFzeW5jKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGRlc3Ryb3lcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKTtcbiAgICAgICAgdGhpcy5vZmYoKTtcbiAgICAgICAgdGhpcy5tb2RlbHMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7e319XG4gICAgICovXG4gICAgc2VyaWFsaXplKCkge1xuICAgICAgICBsZXQgbW9kZWxzID0gdGhpcy5tb2RlbHMubWFwKG1vZGVsID0+IG1vZGVsLnNlcmlhbGl6ZSgpKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcXVlcnk6IHRoaXMuX2xhc3RRdWVyeSxcbiAgICAgICAgICAgIG1vZGVsc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e31bXX0gbW9kZWxzXG4gICAgICogQHBhcmFtIHt7fX0gcXVlcnlcbiAgICAgKiBAcGFyYW0ge3t9fSBkZXBlbmRlbmNpZXNcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtNb2RlbH1cbiAgICAgKi9cbiAgICBzdGF0aWMgcmVzdG9yZSh7bW9kZWxzLCBxdWVyeX0sIGRlcGVuZGVuY2llcykge1xuICAgICAgICBsZXQgTW9kZWwgPSB0aGlzLnByb3RvdHlwZS5Nb2RlbCxcbiAgICAgICAgICAgIG1vZGVsc0luc3RhbmNlcyA9IG1vZGVscy5tYXAobW9kZWwgPT4gTW9kZWwucmVzdG9yZShtb2RlbCwgZGVwZW5kZW5jaWVzKSksXG4gICAgICAgICAgICBpbnN0YW5jZSA9IHRoaXMuZGF0YUZhY3RvcnkobW9kZWxzSW5zdGFuY2VzLCBkZXBlbmRlbmNpZXMpO1xuXG4gICAgICAgIGluc3RhbmNlLl9sYXN0UXVlcnkgPSBxdWVyeTtcblxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7fX0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtNb2RlbH1cbiAgICAgKi9cbiAgICBzdGF0aWMgZmFjdG9yeShvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFGYWN0b3J5KG51bGwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e318bnVsbH0gZGF0YVxuICAgICAqIEBwYXJhbSB7e319IFtvcHRpb25zXVxuICAgICAqXG4gICAgICogQHJldHVybnMge01vZGVsfVxuICAgICAqL1xuICAgIHN0YXRpYyBkYXRhRmFjdG9yeShkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcyhkYXRhLCBvcHRpb25zKTtcbiAgICB9XG5cbn0iXX0=
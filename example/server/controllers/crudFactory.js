import {Router} from 'express';

let wrap = callback => {
    return (req, res, next) => {
        callback(req, res, next)
            .then(data => data && res.json(data))
            .catch(next);
    };
};

export function crudFactory(Model) {
    let app = new Router();

    app.get('/', wrap((req) => {
        let query = Object.assign({}, req.query),
            options = {};

        if (query._order) {
            options = {sort: query._order};

            delete query._order;
        }

        return Model.find(query, options);
    }));

    app.post('/', wrap((req) => {
        return Model.create(req.body).save();
    }));

    app.get('/:id', wrap((req, res) => {
        return Model.findOne({_id: req.params.id})
            .then(task => {
                if (!task) {
                    return res.status(404).json({error: 'Not found'});
                }

                return task;
            });
    }));

    app.delete('/:id', wrap((req, res) => {
        return Model.findOne({_id: req.params.id})
            .then(task => {
                if (!task) {
                    return res.status(404).json({error: 'Not found'});
                }

                return task.delete();
            })
            .then(() => {
                return {};
            });
    }));

    app.put('/:id', wrap((req, res) => {
        return Model.findOne({_id: req.params.id}).then(task => {
            if (!task) {
                return res.status(404).json({error: 'Not found'});
            }

            Object.assign(task, req.body);

            return task.save();
        });
    }));

    app.use((err, req, res, next) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: err.message,
                stack: err && err.stack && err.stack.split('\n')
            });
        }
    });

    return app;
}

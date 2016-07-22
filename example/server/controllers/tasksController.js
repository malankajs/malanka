import {Router} from 'express';

export let tasksController = new Router();

tasksController.get('/', (req, res, next) => {
    Promise.resolve(req.di('tasksService'))
        .then(tasksService => {
            return tasksService.find();
        })
        .then(tasks => {
            res.json(tasks);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

tasksController.post('/', (req, res, next) => {
    Promise.resolve(req.di('tasksService'))
        .then(tasksService => {
            return tasksService.create(req.body);
        })
        .then(task => {
            res.json(task);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

tasksController.delete('/:id', (req, res, next) => {
    Promise.resolve(req.di('tasksService'))
        .then(tasksService => {
            return tasksService.findOne(req.params.id);
        })
        .then(task => {
            return task.delete();
        })
        .then(task => {
            res.json({});
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

tasksController.put('/:id', (req, res, next) => {
    Promise.resolve(req.di('tasksService'))
        .then(tasksService => {
            return tasksService.findOne(req.params.id);
        })
        .then(task => {
            Object.assign(task, req.body);

            return task.save();
        })
        .then(task => {
            res.json({});
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});
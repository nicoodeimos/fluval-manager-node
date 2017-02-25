import * as express from 'express';
import {Schedule} from "../../modules/lights/schedule";
import {LightModule} from "../../modules/lights/lights";

let router = express.Router();
let lights = new LightModule()
lights.start();

// module
router.get('/', (request, response) => {
    response.status(200).json(lights.toJSON());
});

router.post('/start', (request, response) => {
    let started = lights.start()
    response.status(started ? 200 : 400).json(lights.toJSON());
});

router.post('/stop', (request, response) => {
    let success = lights.stop()
    response.status(success ? 200 : 400).json(lights.toJSON());
});

// mode
router.put('/mode', (request, response) => {
    let success = lights.setMode(request.body.mode, request.body.state)
    response.status(success ? 200 : 400).json(lights.toJSON());
});

// schedule
router.put('/schedule', (request, response) => {
    let schedule = new Schedule(request.body.schedule)
    let success = lights.setSchedule(schedule)
    response.status(success ? 200 : 400).json(lights.toJSON());
});

export = router;
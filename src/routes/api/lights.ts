import * as express from 'express';
import {Schedule} from "../../modules/lights/schedule";
import {LightModule} from "../../modules/lights/module";

let router = express.Router();
let lightsModule = new LightModule()
lightsModule.start();

// module
router.get('/', (request, response) => {
    response.status(200).json(lightsModule.toJSON());
});

router.post('/start', (request, response) => {
    let started = lightsModule.start()
    response.status(started ? 200 : 400).json(lightsModule.toJSON());
});

router.post('/stop', (request, response) => {
    let success = lightsModule.stop()
    response.status(success ? 200 : 400).json(lightsModule.toJSON());
});

// mode
router.put('/mode', (request, response) => {
    let success = lightsModule.setMode(request.body.mode, request.body.state)
    response.status(success ? 200 : 400).json(lightsModule.toJSON());
});

// schedule
router.put('/schedule', (request, response) => {
    let schedule = new Schedule(request.body.schedule)
    let success = lightsModule.setSchedule(schedule)
    response.status(success ? 200 : 400).json(lightsModule.toJSON());
});

export = router;
import * as express from 'express';
import * as lights from "../../../modules/lights/lights";

let router = express.Router();
let lightsModule = new lights.LightModule()
lightsModule.start();

router.get('/', (request, response) => {
    response.status(200).json({
        status: lightsModule.status,
        state: lightsModule.state,
        mode: lightsModule.mode
    });
});

router.get('/schedule', (request, response) => {
    response.status(200).json({
        duration: lightsModule.schedule.duration,
        states: lightsModule.schedule.states,
        currentState: lightsModule.schedule.currentState
    });
});

router.post('/', (request, response) => {
    response.status(400).json({});
});

export = router;
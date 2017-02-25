import * as express from 'express';
import {HeaterModule} from "../../modules/heater/heater";

let router = express.Router();
let heater = new HeaterModule()
heater.start();

// module
router.get('/', (request, response) => {
    response.status(200).json(heater.toJSON());
});

router.post('/start', (request, response) => {
    let started = heater.start()
    response.status(started ? 200 : 400).json(heater.toJSON());
});

router.post('/stop', (request, response) => {
    let success = heater.stop()
    response.status(success ? 200 : 400).json(heater.toJSON());
});

export = router;
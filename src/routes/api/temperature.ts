import * as express from 'express';
import {TemperatureModule} from "../../modules/temperature/temperature";

let router = express.Router();
let temperature = new TemperatureModule()
temperature.start();

// module
router.get('/', (request, response) => {
    response.status(200).json(temperature.toJSON());
});

router.post('/start', (request, response) => {
    let started = temperature.start()
    response.status(started ? 200 : 400).json(temperature.toJSON());
});

router.post('/stop', (request, response) => {
    let success = temperature.stop()
    response.status(success ? 200 : 400).json(temperature.toJSON());
});

export = router;
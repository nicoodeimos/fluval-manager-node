import * as express from 'express';
import {FilterModule} from "../../modules/filter/filter";

let router = express.Router();
let filter = new FilterModule()
filter.start();

// module
router.get('/', (request, response) => {
    response.status(200).json(filter.toJSON());
});

router.post('/start', (request, response) => {
    let started = filter.start()
    response.status(started ? 200 : 400).json(filter.toJSON());
});

router.post('/stop', (request, response) => {
    let success = filter.stop()
    response.status(success ? 200 : 400).json(filter.toJSON());
});

export = router;
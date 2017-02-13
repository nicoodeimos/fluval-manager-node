import * as express from 'express';
import * as lightsModule from "../../../modules/lights/lights";

let router = express.Router();
let lights = new lightsModule.LightsModule()

router.get('/state', function(request, response) {
    response.status(200).json({
        state: lights.state,
        mode: lights.mode
    });
});

router.get('/schedule', function(request, response) {
    response.status(200).json({

    });
});

export = router;
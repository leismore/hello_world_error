import * as express from 'express';
import {LMError}    from '@leismore/lmerror';
import {Response}   from '@leismore/response';

const app  = express();
const port = 3000;

app.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
  let error = {message: 'something_wrong', code: 'error_1'};
  let response = {statusCode:'503', headers:{'Content-Type':'application/json'}, body:{error: 'something_wrong'}};
  let previous_error = new Error('another_error');
  next( new LMError(error, response, previous_error) );
});

app.use((error:Error, req:express.Request, res:express.Response, next:express.NextFunction) => {
  let resp = new Response(res);
  resp.sendERROR(error);
});

app.listen(port, () => console.log(`hello_world_error listening on port ${port}!`));

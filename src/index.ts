import express = require('express');
import { LMResponse as Resp, LMResponseData as RespData } from '@leismore/response';
import {LMError, LMErrorErr, LMErrorRes} from '@leismore/lmerror';
import {error_handler_last} from '@leismore/error_handler_last';

const app  = express();
const port = 8080;

class MyError extends LMError
{
  /**
   * Code      Message
   * error_1   something_wrong
   * error_2   another_error
   */
}

const get_ok_handler = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  let resp = new Resp(res);
  let data:RespData = { statusCode: '200', headers:{'Content-Type':'application/json'}, body:{result: 'OK'} };
  resp.send(data);
};

const get_error_handler = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  let error:LMErrorErr = {message: 'something_wrong', code: 'error_1'};
  let response:LMErrorRes = {statusCode:'500',
    headers:{'Content-Type':'application/json'}, body:{error: 'something_wrong'}};
  let previous_error = new Error('another_error');
  next( new MyError(error, response, previous_error) );
}

app.get('/', get_ok_handler);
app.get('/error', get_error_handler);

// Add error handler
app.use(error_handler_last);

app.listen( port, () => console.log(`hello_world_error listening on port ${port}!`) );

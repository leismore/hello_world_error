import * as express         from 'express';
import {LMError}            from '@leismore/lmerror';
import {error_handler_last} from '@leismore/error_handler_last';

const app  = express();
const port = 3000;

class MyError extends LMError
{
  /**
   * Code      Message
   * error_1   something_wrong
   * error_2   another_error
   */
}

app.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
  let error          = {message: 'something_wrong', code: 'error_1'};
  let response       = {statusCode:'503', headers:{'Content-Type':'application/json'}, body:{error: 'something_wrong'}};
  let previous_error = new Error('another_error');
  next( new MyError(error, response, previous_error) );
});

// Add error handler
app.use(error_handler_last);

app.listen( port, () => console.log(`hello_world_error listening on port ${port}!`) );

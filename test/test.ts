/**
 * Because `start-server-and-test` DOES NOT support testing for non-success HTTP responses,
 * the unit test in this package DOES NOT actually test error handling!!!
 * Currently, the unit test ONLY validating if the server is working properly.
 */

import { assert } from 'chai';
import axios from 'axios';

describe('hello_world_error application', function(){
    it('GET: The server should returns {result: OK} (application/json)', function(){
        return axios.get('http://localhost:8080').then(res=>{
            assert( (String(res.headers['content-type']).includes('application/json') &&
              res.data.result === 'OK'), 'Returns incorrect content' );
        }).catch(e=>{
            assert(false, 'Returns failure');
        });
    });
});

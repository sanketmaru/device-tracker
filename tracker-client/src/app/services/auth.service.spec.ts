import {TestBed, inject, async, getTestBed } from '@angular/core/testing';
import {
  Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';
import {ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


describe('AuthService', () => {
  
  let backend: MockBackend;
  let service: AuthService;

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.url === environment.loginApi) {
          const responseOptions = new ResponseOptions(options);
          const response = new Response(responseOptions);
          connection.mockRespond(response);
        }
    });
  }

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [AuthService,
      MockBackend,
      BaseRequestOptions,
      {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
       }]
    });
    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(AuthService);
  });

  it('should login and check username',() => {

    setupConnections(backend, {
      body: {
        token: 'test',
        userId: '1',
        username: 'test'
      },
      status: 200
    });

    let credentials = {
      'username' : 'test',
      'password' : '1111'
    };

    service.login(credentials).subscribe((data) => {
        console.log(data);
        expect(data.username).toBe('test');
    });
      
  });

  it('should signup and check username',() => {

    setupConnections(backend, {
      body: {
        token: 'test',
        userId: '1',
        username: 'test'
      },
      status: 200
    });

    let credentials = {
      'username' : 'test',
      'password' : '1111'
    };

    service.signup(credentials).subscribe((data) => {
        console.log(data);
        expect(data.username).toBe('test');
    });
      

    
  });


});

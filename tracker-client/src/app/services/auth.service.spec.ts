import { getTestBed, TestBed } from '@angular/core/testing';
import {
  BaseRequestOptions,
  Http, Response, ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  
  let backend: MockBackend;
  let service: AuthService;

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);
      connection.mockRespond(response);
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
        expect(data.username).toBe('test');
    });
      
  });


});

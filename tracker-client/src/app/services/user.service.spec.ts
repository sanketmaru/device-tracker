import { getTestBed, TestBed } from '@angular/core/testing';
import {
  BaseRequestOptions,
  Http, Response, ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {

  let backend: MockBackend;
  let service: UserService;

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);
      connection.mockRespond(response);
    });
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [UserService,
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
    service = testbed.get(UserService);
  });

  it('should signup and check username', () => {

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

    service.save(credentials).subscribe((data) => {
        console.log(data);
        expect(data.username).toBe('test');
    });
  });

  it('should retrieve list of users', () => {
    service.get().subscribe((data) => {
      expect(data.length).toBeGreaterThanOrEqual(1);
    });
  });


});

import { async, ComponentFixture, inject, TestBed, getTestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';   
import { FormsModule }   from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {
  Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';
import {ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { environment } from '../../environments/environment';

class MockRouter {
    navigate(url: string) { return url; }
}

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.url === environment.login) {
          const responseOptions = new ResponseOptions(options);
          const response = new Response(responseOptions);
          connection.mockRespond(response);
        }
    });
  }

  beforeEach(async(() => {
    let backend: MockBackend;
    let service: AuthService;

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
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
      },
      { provide: Router, useClass: MockRouter }], 
      imports: [
        FormsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(AuthService);      
      
  }));
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have loggedinUser and navigate to map', inject([Router, AuthService], (router: Router, service: AuthService) => {
    const spy = spyOn(router, 'navigate');
    localStorage.setItem('user', JSON.stringify({token : 'abcd'}));
    component.ngOnInit();
    expect(component.loggedInUser).toBeTruthy();
    const url = spy.calls.first().args[0];
    expect(url[0]).toBe('map');    
  }));

  it('doesnt have loggedinUser and does not navigates to map', inject([Router, AuthService], (router: Router, service: AuthService) => {
    const spy = spyOn(router, 'navigate');
    localStorage.removeItem('user');
    component.ngOnInit();
    expect(component.loggedInUser).toBeNull();    
  }));

});

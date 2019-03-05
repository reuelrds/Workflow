// import { AuthService } from './auth.service';
// import { TestBed, inject } from '@angular/core/testing';
// import { MockBackend } from '@angular/http/testing';
// import {
//   HttpClientTestingModule,
//   HttpTestingController
// } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClient } from '@angular/common/http';

// /**
//  * Test suites for AuthService
//  */

// interface LoginData {
//   email: string;
//   password: string;
// }

// interface UserSignupData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   token: string;
//   image?: File;
// }

// interface AdminSignupData {
//   companyName: string;
//   email: string;
//   password: string;
// }

// const loginData: LoginData = {
//   email: 'test1@email.com',
//   password: 'test1passwd'
// };

// const userSignupData = {
//   firstName: 'Karma',
//   lastName: 'Jasmine',
//   email: 'karma@jasmine.com',
//   password: 'angulartest',
//   token: 'fakeToken'
// };

// const adminSignupData = {
//   companyName: 'Karma',
//   email: 'karma@jasmine.com',
//   password: 'angulartest',
// };

// describe('Testing AuthService', () => {
//   let service: AuthService = null;
//   let httpClient: HttpClient;
//   let httpTestingController: HttpTestingController;
//   let router;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule, HttpClientTestingModule],
//       providers: [AuthService]
//     });
//     service = TestBed.get(AuthService);
//     httpClient = TestBed.get(HttpClient);
//     httpTestingController = TestBed.get(HttpTestingController);
//     router = TestBed.get(RouterTestingModule);
//   });

//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   describe('Testing Login function', async () => {
//     it('should successfully login user', () => {
//       service
//         .loginUser(loginData.email, loginData.password)
//         .subscribe(result => {
//           expect(result.jwtToken).toBe('testToken');
//           expect(result.expiresIn).toBe(3600);
//           expect(result.usertype).toBe('Admin');

//           expect(service.getIsAuth).toBeTruthy();
//         });

//       const req = httpTestingController.expectOne(
//         'http://localhost:3000/api/user/login'
//       );
//       expect(req.request.method).toEqual('POST');

//       const postData = req.request.body;
//       expect(postData).toEqual(loginData);

//       req.flush({
//         jwtToken: 'testToken',
//         usertype: 'Admin',
//         expiresIn: 3600
//       });
//     });

//     it('should return initially that a user isn\'t authenticated and true after calling login function', () => {
//       expect(service.getIsAuth()).toBeFalsy();

//       service.loginUser(loginData.email, loginData.password).subscribe(() => {
//         expect(service.getIsAuth()).toBeTruthy();
//       });

//       const req = httpTestingController.expectOne(
//         'http://localhost:3000/api/user/login'
//       );
//       expect(req.request.method).toEqual('POST');

//       const postData = req.request.body;
//       expect(postData).toEqual(loginData);

//       req.flush({
//         jwtToken: 'testToken',
//         usertype: 'Admin',
//         expiresIn: 3600
//       });
//     });

//     it('shouldn\'t login user upon invalid reply from server', () => {
//       service
//         .loginUser(loginData.email, loginData.password)
//         .subscribe(result => {
//           expect(service.getIsAuth()).toBeFalsy();
//         });

//       const req = httpTestingController.expectOne(
//         'http://localhost:3000/api/user/login'
//       );
//       const postData = req.request.body;

//       req.flush({
//         jwtToken: null,
//         usertype: null,
//         expiresIn: null
//       });
//     });

//     it('should throw an error when invalid user credentials are recieved', () => {
//       expect(() => service.loginUser(null, null)).toThrow(
//         new Error('Invalid Credentials')
//       );
//     });
//   });

//   describe('Testing User Signup method', async () => {

//     it('should successfully signup user even when image isn\'t supplied', () => {

//       service.createUser(
//         userSignupData.firstName,
//         userSignupData.lastName,
//         userSignupData.email,
//         userSignupData.password,
//         userSignupData.token
//       ).subscribe((res) => {
//         expect(res.message).toBe('User Successfully Created');
//       });

//       const req = httpTestingController.expectOne(
//         'http://localhost:3000/api/user/user-signup'
//       );
//       const postData = req.request.body;
//       // expect({...postData}).toBe(userSignupData);

//       req.flush({
//         message: 'User Successfully Created'
//       });

//     });

//     it('should throw an error when the server returns an error', () => {

//       service.createUser(
//         userSignupData.firstName,
//         userSignupData.lastName,
//         userSignupData.email,
//         userSignupData.password,
//         userSignupData.token
//       ).subscribe((res) => {}, err => {
//         expect(err.error.type).toBe('InvalidUserCredentials');
//         expect(err.error.message).toBe('Couldn\'t verify the token');

//       });

//       const req = httpTestingController.expectOne(
//         'http://localhost:3000/api/user/user-signup'
//       );

//       const postData = req.request.body;

//       // Send an Error of `InvalidUserCredentials`
//       req.error(new ErrorEvent('InvalidUserCredentials', {message: 'Couldn\'t verify the token'}));

//     });

//     it('should throw Error when null or undefined form inputs are passed', () => {

//       expect(() => service.createUser(null, undefined, 'efe', null, '')).toThrow(new Error('Invalid Form Inputs'));

//     });

//   });

//   describe('Testing Admin signup method', async () => {
//     it('should successfully signup admin', () => {

//       service.createAdmin(
//         adminSignupData.companyName,
//         adminSignupData.email,
//         adminSignupData.password,
//       ).subscribe((res) => {
//         expect(res.message).toBe('Admin Successfully Created');
//       });

//       const req = httpTestingController.expectOne(
//         'http://localhost:3000/api/user/admin-signup'
//       );

//       req.flush({
//         message: 'Admin Successfully Created'
//       });

//     });

//     it('should throw an error when the server returns an error', () => {

//       service.createAdmin(
//         adminSignupData.companyName,
//         adminSignupData.email,
//         adminSignupData.password,
//       ).subscribe((res) => {}, err => {
//         expect(err.error.type).toBe('InvalidRequest');
//         expect(err.error.message).toBe('Please try again');

//       });

//       const req = httpTestingController.expectOne(
//         'http://localhost:3000/api/user/admin-signup'
//       );

//       const postData = req.request.body;

//       // Send an Error of `InvalidUserCredentials`
//       req.error(new ErrorEvent('InvalidRequest', {message: 'Please try again'}));

//     });

//     it('should throw Error when null or undefined form inputs are passed', () => {

//       expect(() => service.createAdmin(null, undefined, 'efe')).toThrow(new Error('Invalid Form Inputs'));

//     });

//   });
// });

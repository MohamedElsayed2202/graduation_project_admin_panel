// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  StudentApi: 'http://localhost:8080/api/v1/student',
  TeacherApi: 'http://localhost:8080/api/v1/teacher',
  GradeApi: 'http://localhost:8080/api/v1/grade',
  AdminApi: 'http://localhost:8080/api/v1/admin',
  EventApi: 'http://localhost:8080/api/v1/events',
  ClassTable: 'http://localhost:8080/api/v1/classtimetable',
  TeacherTable: 'http://localhost:8080/api/v1/teachertimetable',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// Data Class with constructors assigning values to its property

class Data {
  students;
  courses;
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

// creating an object and setting it to null

let dataCollection = null;


const fs = require('fs');


// initialize function reating the student and courses json file 
// and setting those values to the Data class properties
function initialize() {
  return new Promise(function (resolve, reject) {
    let studentDataFromFile;
    let courseDataFromFile;

    fs.readFile('./data/students.json', 'utf8', function (err, dataFromStudentsFile) {
      if (err) {
        console.log(err);
        reject("Unable to read Students.json file"); // Rejecting promise if error occours
        return;
      }

      studentDataFromFile = JSON.parse(dataFromStudentsFile);
      checkDataRetrievalCompletion(); 
    });

    fs.readFile('./data/courses.json', 'utf8', function (err, dataFromCoursesFile) {
      if (err) {
        console.log(err);
        reject("Unable to read Courses.json file"); // Rejecting promise if error occours
        return;
      }

      courseDataFromFile = JSON.parse(dataFromCoursesFile);
      checkDataRetrievalCompletion(); // Check if both file reading operations are complete
    });

    function checkDataRetrievalCompletion() {
      // Check if both file reading operations are complete
      if (studentDataFromFile && courseDataFromFile) {
        dataCollection = new Data(studentDataFromFile, courseDataFromFile);
        resolve(); // Resolve the promise once data is available
      }
    }
  });
}

function getAllStudents(){
  return new Promise(function (resolve, reject) {
      if(dataCollection.students.length<=0){
          reject("No result with Sutdent data returned"); // Rejecting promise if error occours
          return;
      }
      resolve(dataCollection.students)
      return;
  });
}

// getTAs function that returns an array of student records
// but only of students whose TA is True

// getCourses function that returns an array of all of the courses records

function getCourses(){
return new Promise(function (resolve, reject) {
  allCoursesData = dataCollection.courses;
  if(allCoursesData.length <= 0){
      reject("No result of Courses Data returned"); // Rejecting promise if error occours
      return;
  }
  resolve(allCoursesData); 
  return;
});
}

function getStudentByNum(num){
    return new Promise(function (resolve, reject) {
      studentData = dataCollection.students;
      if(studentData.length <= 0){
        reject("No result returned"); // Rejecting promise if error occours
        return;
      }
      for (let i = 0; i < studentData.length; i++) {
        if(studentData[i].studentNum == num){
            resolve(studentData[i]);
            return;
        }
      }
      reject("no results returned"); // Rejecting promise if error occours
      return;
    });
}

function getStudentsByCourse(course){
  return new Promise(function (resolve, reject) {
    studentData = dataCollection.students;
    studentArr = []
    if(studentData.length <= 0){
      reject("No result returned"); // Rejecting promise if error occours
      return;
    }
    for (let i = 0; i < studentData.length; i++) {
      if(studentData[i].course == course){
        studentArr.push(studentData[i]);
      }
    }
    if(studentArr.length == 0){
      reject("No result returned"); // Rejecting promise if error occours
      return;
    }
    resolve(studentArr);
    return
  });
}

function addStudent(studentData){
  return new Promise(function (resolve, reject) {
    console.log(studentData)
    studentData.studentNum = dataCollection.students.length + 1;
    studentData.TA = (typeof studentData.TA === 'undefined') ? false : true;
    console.log(studentData)
    dataCollection.students.push(studentData)

    if(studentData.length == 0){
      reject("No result returned"); // Rejecting promise if error occours
      return;
    }
    resolve(studentData);
    return
  });
}

function updateStudent(studentData){
  return new Promise(function (resolve, reject) {
    if(studentData.length == 0){
      reject("No result returned"); // Rejecting promise if error occours
      return;
    }
    studentsAll = dataCollection.students
    for(i=0; i < studentsAll.length; i++){
      if(studentData.studentNum == studentsAll[i].studentNum){
        studentsAll[i].firstName = studentData.firstName
        studentsAll[i].lastName = studentData.lastName
        studentsAll[i].email = studentData.email
        studentsAll[i].addressStreet = studentData.addressStreet
        studentsAll[i].addressCity = studentData.addressCity
        studentsAll[i].addressProvince = studentData.addressProvince
        studentsAll[i].TA = (typeof studentData.TA === 'undefined') ? false : true;
        studentsAll[i].status = studentData.status
        studentsAll[i].course = studentData.course
      }
    }
    
    resolve(studentData);
    return
  });
}
function getCourseById(id){
  return new Promise(function (resolve, reject) {
    allCoursesData = dataCollection.courses;
    if(allCoursesData.length <= 0){
      reject("No result returned"); // Rejecting promise if error occours
      return;
    }
    for (let i = 0; i < allCoursesData.length; i++) {
      if(allCoursesData[i].courseId == id){
          resolve(allCoursesData[i]);
          return;
      }
    }
    reject("no results returned"); // Rejecting promise if error occours
    return;
  });
}


// exporitng functions so that a.js can access them 


 module.exports = { 
  initialize,
  getAllStudents,
  getCourses,
  getStudentByNum,
  getStudentsByCourse,
  addStudent,
  updateStudent,
  getCourseById
};

#!/usr/bin/env node

import * as readlineSync from 'readline-sync';

class Course {
  constructor(public id: number, public name: string) {}
}

class Student {
  private courses: Course[] = [];

  constructor(public id: number, public name: string) {}

  enroll(course: Course) {
    this.courses.push(course);
  }

  viewCourses() {
    if (this.courses.length === 0) {
      console.log(`${this.name} is not enrolled in any courses.`);
    } else {
      console.log(`${this.name}'s enrolled courses:`);
      this.courses.forEach((course, index) => {
        console.log(`${index + 1}. ${course.name}`);
      });
    }
  }
}

const courses: Course[] = [
  new Course(1, "Math"),
  new Course(2, "History"),
  new Course(3, "Science"),
];

const students: Student[] = [];

function addStudent(name: string) {
  const student = new Student(students.length + 1, name);
  students.push(student);
  console.log(`Student ${student.name} added with ID ${student.id}`);
}

function enrollStudent(studentId: number, courseId: number) {
  const student = students.find((s) => s.id === studentId);
  const course = courses.find((c) => c.id === courseId);

  if (student && course) {
    student.enroll(course);
    console.log(`${student.name} enrolled in ${course.name}`);
  } else {
    console.log("Student or course not found.");
  }
}

function mainn() {
  console.log("Welcome to the Learning Management System");

  while (true) {
    console.log("\nOptions:");
    console.log("1. Add Student");
    console.log("2. Enroll Student in Course");
    console.log("3. View Student's Enrolled Courses");
    console.log("4. Exit");

    const choice = readlineSync.question("Select an option: ");

    switch (choice) {
      case "1":
        const name = readlineSync.question("Enter the student's name: ");
        addStudent(name);
        break;

      case "2":
        const studentId = parseInt(readlineSync.question("Enter student ID:"));
        const courseId = parseInt(readlineSync.question("Enter course ID:"));
        enrollStudent(studentId, courseId);
        break;

      case "3":
        const studentIdView = parseInt(readlineSync.question("Enter student ID:"));
        const studentView = students.find((s) => s.id === studentIdView);
        if (studentView) {
          studentView.viewCourses();
        } else {
          console.log("Student not found.");
        }
        break;

      case "4":
        console.log("Exiting Learning Management System");
        return;

      default:
        console.log("Invalid option. Please choose a valid option.");
    }
  }
}
export default mainn ;
mainn();

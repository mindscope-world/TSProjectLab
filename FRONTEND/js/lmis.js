let students = [];
let courses = [];
let grades = [];

function addStudent() {
    let name = document.getElementById('student-name').value;
    if (name) {
        students.push(name);
        updateStudentList();
        updateSelectOptions();
        document.getElementById('student-name').value = '';
    }
}

function addCourse() {
    let course = document.getElementById('course-name').value;
    if (course) {
        courses.push(course);
        updateCourseList();
        updateSelectOptions();
        document.getElementById('course-name').value = '';
    }
}

function assignGrade() {
    let student = document.getElementById('student-select').value;
    let course = document.getElementById('course-select').value;
    let grade = document.getElementById('grade-input').value;
    
    if (student && course && grade) {
        grades.push({ student, course, grade });
        updateGradeList();
        document.getElementById('grade-input').value = '';
    }
}

function updateStudentList() {
    let list = document.getElementById('student-list');
    list.innerHTML = '';
    students.forEach(student => {
        let li = document.createElement('li');
        li.textContent = student;
        list.appendChild(li);
    });
}

function updateCourseList() {
    let list = document.getElementById('course-list');
    list.innerHTML = '';
    courses.forEach(course => {
        let li = document.createElement('li');
        li.textContent = course;
        list.appendChild(li);
    });
}

function updateGradeList() {
    let list = document.getElementById('grades-list');
    list.innerHTML = '';
    grades.forEach(entry => {
        let li = document.createElement('li');
        li.textContent = `${entry.student} - ${entry.course}: ${entry.grade}`;
        list.appendChild(li);
    });
}

function updateSelectOptions() {
    let studentSelect = document.getElementById('student-select');
    let courseSelect = document.getElementById('course-select');
    
    studentSelect.innerHTML = students.map(s => `<option value="${s}">${s}</option>`).join('');
    courseSelect.innerHTML = courses.map(c => `<option value="${c}">${c}</option>`).join('');
}

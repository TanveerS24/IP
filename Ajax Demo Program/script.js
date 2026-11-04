function getStudentId() {
  return document.getElementById("studentId").value.trim();
}

function showMessage(message) {
  document.getElementById("result").innerHTML =
    "<h2>Result</h2><p>" + message + "</p>";
}

function showStudent(student, source) {
  document.getElementById("result").innerHTML =
    "<h2>Result</h2>" +
    "<p><strong>Source:</strong> " + source + "</p>" +
    "<p><strong>ID:</strong> " + student.id + "</p>" +
    "<p><strong>Name:</strong> " + student.name + "</p>" +
    "<p><strong>Department:</strong> " + student.department + "</p>" +
    "<p><strong>Year:</strong> " + student.year + "</p>" +
    "<p><strong>CGPA:</strong> " + student.cgpa + "</p>";
}

function loadFromJSON() {
  const studentId = getStudentId();

  if (studentId === "") {
    showMessage("Please enter a Student ID.");
    return;
  }

  const xhr = new XMLHttpRequest();

  xhr.open("GET", "students.json", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      const student = data.students.find(function (item) {
        return item.id.toLowerCase() === studentId.toLowerCase();
      });

      if (student) {
        showStudent(student, "JSON");
      } else {
        showMessage("Student not found in JSON data.");
      }
    } else {
      showMessage("Unable to load JSON file.");
    }
  };

  xhr.onerror = function () {
    showMessage("AJAX network error while loading JSON.");
  };

  xhr.send();
}

function loadFromXML() {
  const studentId = getStudentId();

  if (studentId === "") {
    showMessage("Please enter a Student ID.");
    return;
  }

  const xhr = new XMLHttpRequest();

  xhr.open("GET", "students.xml", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const xml = xhr.responseXML;
      const students = xml.getElementsByTagName("student");

      for (let i = 0; i < students.length; i++) {
        const id =
          students[i].getElementsByTagName("id")[0].textContent;

        if (id.toLowerCase() === studentId.toLowerCase()) {
          const student = {
            id: id,
            name: students[i].getElementsByTagName("name")[0].textContent,
            department: students[i].getElementsByTagName("department")[0].textContent,
            year: students[i].getElementsByTagName("year")[0].textContent,
            cgpa: students[i].getElementsByTagName("cgpa")[0].textContent
          };

          showStudent(student, "XML");
          return;
        }
      }

      showMessage("Student not found in XML data.");
    } else {
      showMessage("Unable to load XML file.");
    }
  };

  xhr.onerror = function () {
    showMessage("AJAX network error while loading XML.");
  };

  xhr.send();
}
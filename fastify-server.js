const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
  ];

// Receive a request
// Do something with that request
// Give a response

// Require the Fastify framework and instantiate it
const fastify = require("fastify")();
// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax
fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});

// Student/id route
fastify.get("/cit/student/:id", (request, reply) => {
    // Receive a request <- recive a studnet id "x"
    studentIDFromClient = request.params.id;
    // Do something with that request <- get the student with id  == "x" from array "student"
    let studentToSendToClient = null;
    for (studentInArray of students) {
        if (studentInArray.id == studentIDFromClient) {
            studentToSendToClient = studentInArray;
            break;
        }
    }
    // Give a response <- return the student "s" back to the client
    if (studentToSendToClient != null) {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(studentToSendToClient);
    }
    else {
      reply
      .code(404)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("Could not find student with given id.");
    }
  });

// Student/id route
fastify.get("*", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("<h1>Unmatched route</h1>");
  });
// Add student using post
fastify.post("/cit/student/add", (request, reply) => {

    // Get info from client
    let = objectFromClient = JSON.parse(request.body);
    console.log(objectFromClient);

    // Do something with info
    let maxID = 0;
    for (individualStudent of students) {
      if (maxID < individualStudent.id) {
        maxID = individualStudent.id;
      }
    }

    let generatedStudent = {
      id: maxID + 1,
      last: objectFromClient.last,
      first: objectFromClient.first
    };

    students.push(generatedStudent);

    // Send reply
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(generatedStudent);
  });

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
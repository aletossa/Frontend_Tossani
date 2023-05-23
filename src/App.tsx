import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const data = [
  { name: "Anom", age: 19, gender: "Male" },
  { name: "Megha", age: 19, gender: "Female" },
  { name: "Subham", age: 25, gender: "Male" },
];

function App() {
  const [students, setStudents] = useState(data);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [studenteSelezionato, setStudenteSelezionato] = useState(null);

  function elimina(el: any) {
    setStudents(students.filter(obj => obj.name !== el));
  }

  function aggiungi() {
    if (studenteSelezionato) {
      const aggiornaStudenti = students.map((student) => {
        if (student === studenteSelezionato) {
          return {
            name: name,
            age: parseInt(age),
            gender: gender
          };
        }
        return student;
      });

      setStudents(aggiornaStudenti);
      setStudenteSelezionato(null);
    } else {
      const newStudent = { name: name, age: parseInt(age), gender: gender };
      setStudents([...students, newStudent]);
    }

    bottone();
  }

  function bottone() {
    setShowForm(!showForm);
  }

  function modifica(student: any) {
    setStudenteSelezionato(student);
    bottone();
  }

  return (
    <div className="App">
      <div className="container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Delete</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            {students.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.name}</td>
                  <td>{val.age}</td>
                  <td>{val.gender}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => elimina(val.name)}
                    >
                      ELIMINA
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => modifica(val)}
                    >
                      MODIFICA
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <br />
        <center>
        <button
          className="btn btn-success"
          value="inserisci"
          onClick={() => bottone()}
        >
          Inserisci
        </button>
        </center>
        {showForm && (
          <form>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <br />
            <br />
            <input
              className="form-control"
              type="number"
              name="age"
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
            />
            <br />
            <br />
            <select
              className="form-control"
              name="gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <br />
            <br />
            <input
              className="btn btn-primary"
              type="submit"
              value="Salva"
              name="salva"
              onClick={() => aggiungi()}
            />
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
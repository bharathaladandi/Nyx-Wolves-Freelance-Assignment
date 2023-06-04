import React, { useEffect, useState } from 'react';
import { Container, Header, List, Form, Input, Button, Item } from 'semantic-ui-react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:8000');


export const Homepage = () => {

  // const [records, setRecords] = useState([]);
  // const [firstName, setfirstName] = useState('');
  // const [lastName, setlastName] = useState('');
  // const [inputValue, setInputValue] = useState('');


  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };


  // useEffect(() => {
  //   socket.on('records', updatedRecords => {
  //     setRecords(updatedRecords);
  //   });

  //   fetchData();
  //   return () => {
  //     socket.off('records');
  //   };
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/users')
  //     setRecords(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  // const addRecord = async (e) => {

  //   // e.preventDefault();
  //   try {
  //     //   const payload = {
  //     //     email,
  //     //     password
  //     // }

  //     // fetch("http://localhost:8000/users/create", {
  //     //   method: "POST",
  //     //   body: JSON.stringify(payload),
  //     //   headers: {
  //     //     'Content-Type': 'application/json'
  //     //   }
  //     // })
  //     //   .then((res) => res.json())
  //     //   .then((res) => {
  //     //     setRecords(res.data)
  //     //     console.log(res);
  //     //   })
  //     //   .catch((err) => console.log(err))

  //      await axios.post('http://localhost:8000/users/create', {
  //       firstName,
  //       lastName
  //     });
  //     setfirstName('');
  //     setlastName('');
  //     console.log(firstName,
  //       lastName);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  // const updateRecord = async (id) => {
  //   id.preventDefault();
  //   try {
      
  //     await axios.put(`http://localhost:8000/users/${id}`, firstName)
  //     .then((response) => {
  //       console.log('Data updated successfully');
  //       // Handle success
  //     })
  //     .catch((error) => {
  //       console.error('Error updating data:', error);
  //       // Handle error
  //     });

  //   }catch (error) {
  //     console.error(error);
  //   }



  // };

  // const deleteRecord = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:8000/users/${id}`);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


    const [records, setRecords] = useState([]);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('recordCreated', (record) => {
      setRecords((prevRecords) => [...prevRecords, record]);
    });

    socket.on('recordUpdated', (updatedRecord) => {
      setRecords((prevRecords) => {
        const index = prevRecords.findIndex((record) => record._id === updatedRecord._id);
        if (index !== -1) {
          const updatedRecords = [...prevRecords];
          updatedRecords[index] = updatedRecord;
          return updatedRecords;
        }
        return prevRecords;
      });
    });

    socket.on('recordDeleted', (deletedRecord) => {
      setRecords((prevRecords) => prevRecords.filter((record) => record._id !== deletedRecord._id));
    });

    return () => {
      socket.disconnect();
    };
  }, []);



  const handleCreate = () => {
    socket.emit('createRecord', { firstName, lastName });
  };

  const handleUpdate = (record) => {
    socket.emit('updateRecord', { id: record._id, firstName, lastName });
  };

  const handleDelete = (recordId) => {
    socket.emit('deleteRecord', recordId);
  };


  return (
    <div>

<h1>Records System</h1>
      <div>
        <input type="text" value={firstName} onChange={(e) => setfirstName(e.target.value)} placeholder="Title" />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
          placeholder="Description"
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <ul>
        {records.map((record) => (
          <li key={record._id}>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              placeholder="Title"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              placeholder="Description"
            />
            <button onClick={() => handleUpdate(record)}>Update</button>
            <button onClick={() => handleDelete(record._id)}>Delete</button>
          </li>
        ))}
      </ul>
{/*       
      <Container>
      <Header as="h1" textAlign="center">
        Records System
      </Header>
      <Form>
        <Form.Group>
          <Form.Field width={6}>
            <Input
            type="text"
              placeholder="FirstName"
              value={firstName}
              onChange={e => setfirstName(e.target.value)}
            />
          </Form.Field>
          <Form.Field width={8}>
            <Input
            type="text"
              placeholder="LastName"
              value={lastName}
              onChange={e => setlastName(e.target.value)}
            />
          </Form.Field>

          <Form.Field width={2}>
            <Button primary onClick={addRecord}>Add</Button>
          </Form.Field>
        </Form.Group>
      </Form>

      
      <List divided relaxed>
        {records && records.length > 0  && records.map(record => (
          <List.Item key={record._id}>
            <List.Content floated="right">
              <Form onSubmit={updateRecord}> */}
                {/* <Input
                  type='text'
                  value={_id}
                  onChange={e => updateRecord(record._id, e.target.value, record.lastName)}
                /> */}
                {/* <Input
                type="text" value={firstName} onChange={handleInputChange}
                 />
                               <Button color="blue"  type="submit">Update</Button>
              </Form>

            </List.Content>
            <List.Content>
              <List.Header>{record.firstName}</List.Header>
              <List.Description>{record.lastName}</List.Description>
              <Button color="red" onClick={() => deleteRecord(record._id)}>Delete</Button>
            </List.Content>
          </List.Item>
        ))}
      </List>


      
     */}
    {/* </Container> */}
// {/* 
//       {records && records.length > 0  && records.map((item) => (
//  */}


//       {/* <h1>Add note here</h1>
//       // <input type="text" placeholder="title" value={firstName} onChange={(e) => setfirstName(e.target.value)}></input>
//       // <input type="text" placeholder="actual note" value={lastName} onChange={(e) => setlastName(e.target.value)}></input>
//       // <button onClick={addRecord}>Submit</button> */}

//       {/* // ))} */}
    </div>
  )
}

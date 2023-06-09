import React, { useEffect, useState } from 'react';
import { Container, Header, List, Form, Input, Button, Item } from 'semantic-ui-react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:8000');


export const Homepage = () => {

  const [records, setRecords] = useState([]);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [inputValue, setInputValue] = useState('');


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  useEffect(() => {
    socket.on('records', updatedRecords => {
      setRecords(updatedRecords);
    });

    fetchData();
    return () => {
      socket.off('records');
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users')
      setRecords(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const addRecord = async (e) => {

    // e.preventDefault();
    try {
      //   const payload = {
      //     email,
      //     password
      // }

      // fetch("http://localhost:8000/users/create", {
      //   method: "POST",
      //   body: JSON.stringify(payload),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      //   .then((res) => res.json())
      //   .then((res) => {
      //     setRecords(res.data)
      //     console.log(res);
      //   })
      //   .catch((err) => console.log(err))

       await axios.post('http://localhost:8000/users/create', {
        firstName,
        lastName
      });
      setfirstName('');
      setlastName('');
      console.log(firstName,
        lastName);
    } catch (error) {
      console.error(error);
    }
  };


  const updateRecord = async (id) => {
    // e.preventDefault();
    try {
      
      await axios.put(`http://localhost:8000/users/${id}`, )
      .then((response) => {
        console.log('Data updated successfully');
        // Handle success
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        // Handle error
      });

    }catch (error) {
      console.error(error);
    }



  };

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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
              <Form>
                {/* <Input
                  type='text'
                  value={_id}
                  onChange={e => updateRecord(record._id, e.target.value, record.lastName)}
                /> */}
                <Input
                type="text" value={inputValue} onChange={handleInputChange}
                 />
                               <Button color="blue" onClick={updateRecord}>Update</Button>
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


      
    
    </Container>
{/* 
      {records && records.length > 0  && records.map((item) => (
 */}


      {/* <h1>Add note here</h1>
      // <input type="text" placeholder="title" value={firstName} onChange={(e) => setfirstName(e.target.value)}></input>
      // <input type="text" placeholder="actual note" value={lastName} onChange={(e) => setlastName(e.target.value)}></input>
      // <button onClick={addRecord}>Submit</button> */}

      {/* // ))} */}
    </div>
  )
}

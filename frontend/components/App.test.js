import React from "react"
import AppClass from "./AppClass"
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// test 1
test('renders Grid App without errors', () => {
  render(<AppClass />);
});

// test 2
test(`renders "You can't go up" if the "LEFT" button is clicked twice`, async () => {
  render(<AppClass />);

  const left = document.querySelector('#left')

  fireEvent.click(left);
  fireEvent.click(left);

  const leftMessage = await screen.findByText("You can't go left");
  expect(leftMessage).toBeInTheDocument();
})

// test 3
test(`renders "You can't go right" if the "RIGHT" button is clicked twice`, async () => {
  render(<AppClass />);

  const right = document.querySelector('#right')

  fireEvent.click(right);
  fireEvent.click(right);

  const rightMessage = await screen.findByText("You can't go right");
  expect(rightMessage).toBeInTheDocument();
})

// test 4
test(`renders "You can't go down" if the "DOWN" button is clicked twice`, async () => {
  render(<AppClass />);

  const down = document.querySelector('#down')

  fireEvent.click(down);
  fireEvent.click(down);

  const downMessage = await screen.findByText("You can't go down");
  expect(downMessage).toBeInTheDocument();
})

// test 5
test(`renders "You can't go up" if the "UP" button is clicked twice`, async () => {
  render(<AppClass />);

  const up = document.querySelector('#up')

  fireEvent.click(up);
  fireEvent.click(up);

  const upMessage = await screen.findByText("You can't go up");
  expect(upMessage).toBeInTheDocument();
})

// test 7 
test('renders basic Coordinates "(2,2)"', async () => {
  render(<AppClass />);

  const basicCoordinates = screen.getByText('Coordinates (2, 2)');

  expect(basicCoordinates).toBeInTheDocument();
  expect(basicCoordinates).toBeTruthy();
})

// test 8
test('renders moving 1 time', async () => {
  render(<AppClass />);

  const left = document.querySelector('#left')

  fireEvent.click(left);

  const movingMessage = await screen.findByText("You moved 1 time");

  expect(movingMessage).toBeInTheDocument();
  expect(movingMessage).toBeTruthy();
})


// // test 9
// test('renders "email is required" if an invalid email is entered', async () => {
//   render(<AppClass />);

//   const emailField = document.querySelector('#email');
//   const submit = document.querySelector('#submit')

//   fireEvent.change(emailField, { target: { value: 'coco@gmail' } });
//   fireEvent.click(submit);

//   const errorMessage = await screen.findByText('Ouch: email must be a valid email');
//   expect(errorMessage).toBeInTheDocument();
// });

// // test 10
// test('renders "email is required" if an invalid email is entered', async () => {
//   render(<AppClass />);

//   const emailField = document.querySelector('#email');
//   const submit = document.querySelector('#submit')

//   fireEvent.change(emailField, { target: { value: 'coco@gmail' } });
//   fireEvent.click(submit);

//   const errorMessage = await screen.findByText('Ouch: email must be a valid email');
//   expect(errorMessage).toBeInTheDocument();
// });

// // test 11
// test('renders "email must be a valid email address" if no email is entered', async () => {
//   render(<AppClass />);

//   const submit = document.querySelector('#submit')
//   fireEvent.click(submit);

//   const errorMessage = await screen.findByText('Ouch: email is required');
//   expect(errorMessage).toBeInTheDocument();
// });

// // test 12
// test(`renders "lady win #49" if "UP", "RIGHT", "Email:lady@gaga.com" and "Submit" buttons are clicked`, async () => {
//   render(<AppClass />);

//   const up = document.querySelector('#up')
//   const right = document.querySelector('#right');
//   const emailField = document.querySelector('#email');
//   const submit = document.querySelector('#submit')

//   fireEvent.click(up);
//   fireEvent.click(right);
//   fireEvent.change(emailField, { target: { value: 'lady@gaga.com' } });
//   fireEvent.click(submit);

//   const submitMessage = await screen.findByText('lady win #49');
//   expect(submitMessage).toBeInTheDocument();
// });

test('sanity', () => {
  expect(true).toBe(true)
})


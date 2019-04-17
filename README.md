
# BANKA (STAY TUNED... Project is still under development phase. )

[![Build Status](https://travis-ci.org/kechyy/Banka.svg?branch=develop)](https://travis-ci.org/kechyy/Banka) [![Coverage Status](https://coveralls.io/repos/github/kechyy/Banka/badge.svg?branch=develop)](https://coveralls.io/github/kechyy/Banka?branch=develop) 

## Description

Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. This app is meant to support a single bank, where users can signup and create bank accounts online, but must visit the branch to withdraw or deposit money.

Project Plan (PIVOTAL TRACKER STORIES): https://www.pivotaltracker.com/n/projects/2320148 
UI-pages: https://kechyy.github.io/Banka/UI 
Hosted API on Heroku: https://kechyy-banka-app.herokuapp.com/api/v1 


## Features
Below are the features of Banka Application at this point

- User(client) can Signup 
- User(client) can Login 
- User(client) can create an account 
- User(client) can view transaction history
- User(client) can view a specific transaction 
- Staff(cashier) can debit(client) account
- Staff(cashier) can credit(client) account
- Admin/Staff can view all user acccounts
- Admin/Staff can view a specific user account
- Admin/Staff can activate or deactivate an account
- Admin/Staff can delete a specific user accounts

## LANDING PAGE
<img src="./UI/images/landingPage.jpg"/>

## API Endpoints
  <table border="1" cellpadding:"10" style="font-size:16px">
    <thead style="background:#666;">
      <tr>
        <th>HTTP VERB</th>
        <th>API ENDPOINT</th>
        <th>FUNCTION</th>
        <th>INPUT</th>
        <th>OUTPUT</th>
      </tr>
      <tbody>
        <tr>
          <td>POST</td>
          <td>api/v1/auth/signup</td>
          <td>signUp</td>
          <td>{
                firstName: string,<br/>
                lastName: string<br/>
                email: string,<br/>
                password: string,<br/>
                cpassword: string<br/>
              }
          </td>
          <td>{<br/>
            status: 201<br/>
              data:{<br/>
                firstName: 'Nkechi',<br/>
                lastName: 'Ogbonna',<br/>
                email: 'nkechi@gmail.com',<br/>
                token: 'kljfkjlfdsakjlfds@#$%'<br/>
              }<br/>
            }
          </td>
        </tr>
        <tr style="background:#ccc; color:#000">
          <td>POST</td>
          <td>api/v1/auth/signin</td>
          <td>signIn</td>
          <td>{<br/>
                email: "string",<br/>
                password: "string,<br/>
                token: string<br/>
              }
          </td>
          <td>{<br/>
                status:200,<br/>
                data{<br/>
                  fistName: 'Nkechi',<br/>
                  lastName: 'Ogbonna',<br/>
                  token: '949494309ksdkjldfskjl@#$*'<br/>
                }<br/>
              }
          </td>
          <tr>
            <td>POST</td>
            <td>api/v1/account</td>
            <td>CreateAccount</td>
            <td>{
              status: 201<br/>
                data:{<br/>
                  firstName: string,<br/>
                  lastName: string,<br/>
                  email: string<br/>
                  type:  string<br/>
                }<br/>
              }</td>
            <td>{
              status: 201<br/>
                data:{<br/>
                  firstName: ''Rosemary,<br/>
                  lastName: 'Emmanuel',<br/>
                  type:     'current'<br/>
                }<br/>
              }<br/>
            </td>
          </tr>
          <tr style="background:#ccc; color:#000">
            <td>PATCH</td>
            <td>api/v1/account:001123456</td>
            <td>updateAccount</td> 
            <td>{<br/>
                  accountNumber: number<br/>
                  status: integer,<br/>
                }
            </td>
            <td>{<br/>
              status: 200<br/>
                data:{<br/>
                  firstName: 'Nkechi',<br/>
                  lastName: 'Ogbonna',<br/>
                  accountNumber: 0011234566<br/>
                  status: active,<br/>
                }<br/>
              }<br/>
            </td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>api/v1/account/001123456</td>
            <td>deleteAccount</td> 
            <td>{<br/>
                  accountNumber: number<br/>
                }
            </td>
            <td>{<br/>
              status: 200<br/>
                data:{<br/>
                  firstName: 'Nkechi',<br/>
                  lastName: 'Ogbonna',<br/>
                  accountNumber: 0011234566<br/>
                  status: active,<br/>
                }<br/>
              }
            </td>
        </tr>
        <tr style="background:#ccc; color:#000">
            <td>POST</td>
            <td>api/v1/transactions/001123456/credit</td>
            <td>creditAccount</td> 
            <td>{<br/>
                  firstName: 'Grace',<br/>
                  lastName: 'Emmanuel',<br/>
                  accountNumber: 0012345678,<br/>
                  amount: '20000',<br/>
                }
            </td>
            <td>{<br/>
              status: 201<br/>
                {<br/>
                  firstName: 'Grace',<br/>
                  lastName: 'Emmanuel',<br/>
                  accountNumber: 0012345678,<br/>
                  amount: '20000',<br/>
                  oldBalance: '80000',<br/>
                  balance: '100000'<br/>
                }<br/>
              }
            </td>
        </tr>
        <tr>
            <td>POST</td>
            <td>api/v1/transactions/001123456/credit</td>
            <td>debitAccount</td> 
            <td>{<br/>
                  firstName: 'Grace',<br/>
                  lastName: 'Emmanuel',<br/>
                  accountNumber: 0012345678,<br/>
                  amount: '2000'<br/>
                }
            </td>
            <td>{<br/>
              status: 201<br/>
                {<br/>
                  firstName: 'Grace',<br/>
                  lastName: 'Emmanuel',<br/>
                  accountNumber: 0012345678,<br/>
                  amount: '20000',<br/>
                  oldBalance: '100000'<br/>
                  balance: '80000'<br/>
                }<br/>
              }
            </td>
        </tr>
      </tbody>
  </table>


## Installation
1. Clone this repository below:
2. https://github.com/kechyy/Banka.git
3. cd into the repository:
4. cd Banka
5. Open the repository in terminal and Install dependencies by running:
6. npm install
7. Run "npm start" to start the app
8. Use Postman to test all endpoints
9. Run "npm test" to test all endpoints


## Technologies
**ES6:** https://en.wikipedia.org/wiki/ECMAScript

**NodeJS:** An open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development. Find out <a href="https://en.wikipedia.org/wiki/Node.js"> here</a>

**ExressJS:** Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. <a href="https://expressjs.com/">Find out more </a>






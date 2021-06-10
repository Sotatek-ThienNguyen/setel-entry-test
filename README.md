## Swagger Specification

- [Orders Service](http://localhost:3000/api/)
- [Payments Service](http://localhost:3000/api/)
## How to run in development

You can can clone this app to your local marchine and run it as local development.
Please follow these steps

1. Go to project
    ```
    cd entry-test-setel
    ```
2. Start application server
    ```
    make up
    ```
3. Data Login
   ```
    {
        username: 'admin',
        password: '1'
    },
    {
        username: 'admin1',
        password: '1'
    },
    {
        username: 'admin2',
        password: '1'
    },
    {
        username: 'admin3',
        password: '1'
    },
    {
        username: 'admin4',
        password: '1'
    },
   ```

## Tests

* To run all tests
  ```
  cd orders && npm test
  cd payments && npm test
  ```

# To use the api's we have a guard(jwt) so only user who's role is "admin" can access those api's so first create a user then manually make him admin in db
## Register
```
curl --location 'http://localhost:3000/auth/registerUser' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "harish kumar",
    "email": "harishbisu201@gmail.com",
    "password": "haris123"
}'
```
## login
```
curl --location 'http://localhost:3000/auth/logIn' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "harishbisu201@gmail.com",
    "password": "haris123"
}'
```
api resopnse will be usertoken

## create vender
```
curl --location 'http://localhost:3000/vendors' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRiYjA5Ni1kOTc4LTRkMDItOWFmNy04ZGU4OTAwNjJlMmYiLCJlbWFpbCI6ImhhcmlzaGJpc3U5NEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjQyOTM0MjAsImV4cCI6MTcyNDg5ODIyMH0.vlJWjrrwrMNogIFByfiMqrq7n5vE5FTunH7X2gJP7bo' \
--data '{
    "name": "harish kumar",
    "address": "hello",
    "contactDetails": "5864545454"
}'
```

## create purchase order
```
curl --location 'http://localhost:3000/purchase-orders' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRiYjA5Ni1kOTc4LTRkMDItOWFmNy04ZGU4OTAwNjJlMmYiLCJlbWFpbCI6ImhhcmlzaGJpc3U5NEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjQyOTM0MjAsImV4cCI6MTcyNDg5ODIyMH0.vlJWjrrwrMNogIFByfiMqrq7n5vE5FTunH7X2gJP7bo' \
--data '{
  "vendorCode": "8ced912a-9aae-4699-9745-1846a140dab1",
  "orderDate": "2024-08-22",
  "issueDate": "2024-08-21",
  "deliveryDate": "2024-08-30",
  "items": [
    {
      "name": "Item 1",
      "quantity": 10,
      "price": 100.0
    },
    {
      "name": "Item 2",
      "quantity": 5,
      "price": 50.0
    }
  ],
  "quantity": 2
}
'
```

## update purchase order
```
curl --location 'http://localhost:3000/purchase-orders/c1c95292-8aa3-4795-a43a-15eb452fa653' \
--header 'poId: c1c95292-8aa3-4795-a43a-15eb452fa653' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRiYjA5Ni1kOTc4LTRkMDItOWFmNy04ZGU4OTAwNjJlMmYiLCJlbWFpbCI6ImhhcmlzaGJpc3U5NEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjQyOTM0MjAsImV4cCI6MTcyNDg5ODIyMH0.vlJWjrrwrMNogIFByfiMqrq7n5vE5FTunH7X2gJP7bo' \
--data '{
  "vendorCode": "8ced912a-9aae-4699-9745-1846a140dab1",
  "orderDate": "2024-08-22",
  "deliveryDate": "2024-08-30",
  "issueDate": "2024-08-22",
  "acknowledgmentDate": "2024-08-22",
  "qualityRating":10,
  "items": [
    {
      "name": "Item 1",
      "quantity": 10,
      "price": 100.0
    },
    {
      "name": "Item 2",
      "quantity": 5,
      "price": 50.0
    }
  ],
  "quantity":10,
  "status": "completed"
}
'
```

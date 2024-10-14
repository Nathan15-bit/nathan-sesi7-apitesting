const { test, expect } = require('@playwright/test')
const { Ajv } = require("ajv");
const exp = require('constants');

const ajv = new Ajv();



//Sample test case for GET request
test('Get list of users', async ({ request }) => {
    const response= await request.get("https://reqres.in/api/users?page=2")
    
    //console.log(await response.json())   
    expect(response.status()).toBe(200);
    
    const resBody=await response.json()
    const schema=require("./json-schema/get-list-of-user.json")

    const valid=ajv.validate(schema, resBody);
    expect(valid).toBe(true);
    if (!valid){
        console.error("AJV Validation errors:", ajv.errorsText(ajv.errors));
    }

    expect(resBody.data[0].first_name).toEqual('Michael');
    expect(resBody.data[0].last_name).toEqual('Lawson');
});



//Sample test case for POST request
test('Create new user', async ({ request }) => {
    const reqHeaders ={
        Accept: 'application/json'
    }

    const body ={
        "name": "Nathan",
        "job": "QA"
    }

    const response= await request.post("https://reqres.in/api/users", {
        headers: reqHeaders,
        data: body,
    })

    expect(response.status()).toBe(201);

    const resBody=await response.json()
    const schema=require("./json-schema/create-user.json")

    const valid=ajv.validate(schema, resBody);
    expect(valid).toBe(true);
    if (!valid){
        console.error("AJV Validation errors:", ajv.errorsText(ajv.errors));
    }

    expect(resBody.name).toEqual('Nathan');
    expect(resBody.job).toEqual('QA');

});



//Sample test case for DELETE request
test('Delete user', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/984');

    expect(response.status()).toBe(204);

});



//Sample test case for PUT request
test('Update user', async ({ request }) => {
    const reqHeaders ={
        Accept: 'application/json'
    }

    const body ={
        "name": "Sangan Nathan",
        "job": "QA"
    }

    const response= await request.put("https://reqres.in/api/users/2", {
        headers: reqHeaders,
        data: body,
    })

    expect(response.status()).toBe(200);

    const resBody=await response.json()
    const schema=require("./json-schema/update-user.json")

    const valid=ajv.validate(schema, resBody);
    expect(valid).toBe(true);
    if (!valid){
        console.error("AJV Validation errors:", ajv.errorsText(ajv.errors));
    }

    expect(resBody.name).toEqual('Sangan Nathan');
    expect(resBody.job).toEqual('QA');

});
const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require ('needle');
const apicache = require('apicache'); 

// Env vars
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE

// Init cache
let cache = apicache.middleware;

router.get('/', cache('2 minutes'), async (req, res) => {
    try {
        console.log("api called");

        const params = new URLSearchParams({
            [API_KEY_NAME]:API_KEY_VALUE,
            ...url.parse(req.url, true).query
        });


        const apiRes = await needle ('get', `${API_BASE_URL}?${params}`);
        const data = apiRes.body;
        // log the request to the publıc API
        if (process.env.NODE_ENV !== 'productıon') {
            console.log(`REQUEST: ${API_BASE_URL}?${params}`)
        }


        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error});
    }
});

 
  
  router.post("/contactMe", (req, res) => { 
      let input = req.body ?? {};

      console.log("contact me input", input)

      if(!input.name || !input.email || !input.message){
          res.status(400).send("Invalid data!!!!"); 
          return;
      }

    const name = input.name;
    const email = input.email;
    const message = input.message; 
    const mail = {
      from: name,
      to: "bolatah@bolatah.com",
      subject: "Contact Form Submission",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
   
    res.status(200).json({status: "email sent", email: mail});
  });
module.exports = router
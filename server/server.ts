import express from 'express';
import bodyParser from 'body-parser';
import https from 'https';

require('dotenv').config({ path: './server/.env'})

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/subscribe', (req, res) => {
	// make a post request to directmailmac containing body from request to /subscribe
	// respond with the response from directmailmac

	const email = JSON.stringify(req.body);
	const credentials = `${process.env.DIRECT_MAIL_USER}:${process.env.DIRECT_MAIL_PASS}`;
	const buff = Buffer.from(credentials);
	const base64credentials = buff.toString('base64');

	const options = {
		host: 'secure.directmailmac.com',
		path: '/api/v2/projects/f6f9cedcf92f6448831eff8e70610784/address-groups/C0AB94CE-1730-4D0D-89BF-BC64B4B794DC/addresses',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Content-Length': email.length,
			'Authorization': 'Basic ' + base64credentials,
		},
		body: email,
	}
	
	const directmail_req = https.request(options, (res) => {
		let data = '';

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			console.log(`Response ${data}`)
		});
	});

	directmail_req.write(email)
	directmail_req.end();
});

app.listen(8080);
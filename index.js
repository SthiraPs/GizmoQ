import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const port = process.env.PORT || 4000;

dotenv.config();

const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY
});

const openAi = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/home', async (req, res) => {
    res.status(200).send({
        message : 'Success',
    });
});

app.post('/question', async (req, res) => {
    try{
        console.log(req)
        const prompt = req.body.prompt;
        const response = await openAi.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        })

        res.status(200).send({
            bot : response.data.choices[0].text
        })
    }
    catch(error)
    {
        console.log(error.message)
        let msg = error.message;
        res.status(500).send({msg})
    }
})

app.listen(port, () => {
    console.log('Server is running...');
    console.log('Port : http://localhost:4000');

})
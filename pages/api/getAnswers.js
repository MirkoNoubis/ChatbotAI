

const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
  apiKey: process.env.OPENAI
})
const openai = new OpenAIApi(configuration)


export default async function handler(req, res) {
  
  if (typeof req.body.prompt === "string") {
    const MyPrompt = req.body.prompt
    

    const response1 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `I want formal and objective email template. ${MyPrompt}`,
      temperature: 0.1,
      max_tokens: 300
    })

    const response2 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `I want informal email template. ${MyPrompt}`,
      temperature: 0.3,
      max_tokens: 300
    })


    const response3 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `I want casual email template. ${MyPrompt}`,
      temperature: 0.4,
      max_tokens: 300
    })





    res.status(200).json([
      { text: response1.data.choices[0].text },
      { text: response2.data.choices[0].text },
      { text: response3.data.choices[0].text }
    ])
  } else {
    res.status(200).json({ text: "Invalid prompt provided." })
  }
}
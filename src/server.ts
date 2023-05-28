import bodyParser from "body-parser";
import express from "express";

import { sns } from "./aws-config";

const TOPIC_ARN = ""; // put here your ARS topic SNS
const app = express();
app.use(bodyParser.json());

app.post("/send-message", async (req, res) => {
  console.log("Sending message to SNS Topic...");
  const message = req.body.message;

  if (!message) return res.status(400).send({ error: "Missing message" });

  const { $response, MessageId } = await sns
    .publish({
      Message: req.body.message,
      TopicArn: TOPIC_ARN,
    })
    .promise();

  if ($response.error) {
    console.log(`[Error] Was not possible to send message`);
    return res.status(502).send({ error: $response.error });
  }

  console.log(`[${MessageId}] Has been sent successfully`);
  return res.send({ ok: true, messageId: MessageId });
});

app.listen(3000, () => {
  console.log("\n[SERVER] listening on port 3000");
  console.log("[SERVER] You can send message");
  console.log("[SERVER] http://localhost:3000/send-message with json body \n");
});

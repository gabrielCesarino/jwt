import { generateSignature } from "./generate-signature";

interface IVerifyOptions {
  token: string;
  secret: string;
}

export function verify(options: IVerifyOptions) {
  const [headerSent, payloadSent, signatureSent] = options.token.split(".");

  const signature = generateSignature({
    header: headerSent,
    payload: payloadSent,
    secret: options.secret,
  });

  if (signature !== signatureSent) {
    throw new Error("Invalid JWT Token");
  }

  const decodedPayload = JSON.parse(
    Buffer.from(payloadSent, "base64url").toString("utf-8")
  );

  if (decodedPayload.exp < new Date().valueOf()) {
    throw new Error("Expired Token");
  }

  return decodedPayload;
}

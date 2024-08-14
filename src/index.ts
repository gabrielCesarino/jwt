import { sign } from "./jwt/sign";

sign({
  exp: new Date().valueOf() + 24 * 60 * 60 * 1000,
  data: {
    sub: "2",
    roles: ["admin", "user"],
  },
  secret: "",
});

import joi from "joi";
import { AccountData } from "../../interfaces/accountInterface";
import { joiValidator } from "../../utils/joiValidator";

export const authValidator = async(data: AccountData) => {
const joiObject = joi.object({
        username: joi.string().min(4).required().label("Username"),
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password"),
    });
  const validate = await joiValidator(joiObject, data);

  return validate;
}
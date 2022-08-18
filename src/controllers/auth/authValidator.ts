import joi from "joi";
import { AccountData } from "../../interfaces/accountInterface";
import { joiValidator } from "../../utils/joiValidator";

export const createAccountValidator = async(data: AccountData) => {
const joiObject = joi.object({
        username: joi.string().min(4).required().label("Username"),
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password"),
    });
  const validate = joiValidator(joiObject, data);

  return validate;
}

export const signInValidator = async(data:any) => {
const joiObject = joi.object({
        username: joi.string().min(4).required().label("Username"),
        password: joi.string().required().label("Password"),
    });
  const validate = joiValidator(joiObject, data);

  return validate;
}

export const inititiatePasswordResetValidator = async(username:string) => {
    const joiObject = joi.object({
            username: joi.string().min(4).required().label("Username"),
        });
      const validate =  joiValidator(joiObject, username);
    
      return validate;
    }

    export const completePasswordResetValidator = async(data:any) => {
        const joiObject = joi.object({
                otp: joi.string().required().label("OTP"),
                username: joi.string().min(4).required().label("Username"),
                password: joi.string().required().label("Password"),
            });
          const validate = joiValidator(joiObject, data);
        
          return validate;
        }
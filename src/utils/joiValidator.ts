import Joi from "joi";

export const joiValidator = async(joiSchema: Joi.ObjectSchema<any>, paramsToValidate: any) => {

const { error } = await joiSchema.validateAsync(paramsToValidate,  {
    errors: {
      wrap: {
        label: ''
      }
    },
    abortEarly: true
  },);

  return error ? error.details[0].message : null;
}
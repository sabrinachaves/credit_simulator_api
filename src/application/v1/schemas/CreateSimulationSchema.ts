import Joi from 'joi';

const CreateSimulationSchema = Joi.object({
  amount: Joi.number().positive().required(),
  paymentTerm: Joi.number().positive().integer().required(),
  birthDate: Joi.date().required(),
});

export default CreateSimulationSchema;

import Joi from 'joi';

const CreateCreditSimulationSchema = Joi.object({
  amount: Joi.number().positive().required(),
  paymentTerm: Joi.number().positive().integer().required(),
  birthDate: Joi.date().required(),
});

export default CreateCreditSimulationSchema;

import Joi from 'joi';

const ListSimulationsSchema = Joi.object({
  minAmount: Joi.number().positive(),
  maxAmount: Joi.number().positive(),
  createdAfter: Joi.date(),
  createdBefore: Joi.date(),
  page: Joi.number().positive(),
  pageSize: Joi.number().positive(),
});

export default ListSimulationsSchema;

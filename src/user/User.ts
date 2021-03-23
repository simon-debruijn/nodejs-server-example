import yup from 'yup';

const userSchema = yup
  .object({
    _id: yup.string().defined(),
    name: yup.string().defined(),
    email: yup.string().defined(),
    password: yup.string().defined(),
    optional: yup.string().nullable(),
  })
  .defined();

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

// you can also use a type alias by this displays better in tooling
// interface User extends Asserts<typeof userSchema> {}

export { userSchema, User };

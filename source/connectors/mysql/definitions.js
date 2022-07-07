import User from '../../graphql/schema/user/model';
import Contact from '../../graphql/schema/contact/model';

const definitions = [
  {
    name: 'user',
    model: User,
    table: 'User',
  },
  {
    name: 'contact',
    model: Contact,
    table: 'Contact',
  }
];

export default definitions;

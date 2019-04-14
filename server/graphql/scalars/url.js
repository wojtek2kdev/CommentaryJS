import { GraphQLScalarType } from 'grapql';
import { Kind } from 'graphql/language';

const URLRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

const URLValidation = (value) => URLRegex.test(value) ? value : null;

export default new GraphQLScalarType({
  name: 'URL',
  description: 'URL link data type',
  parseValue: URLValidation,
  serialize: URLValidation,
  parseLiteral: ({kind, value}) => {
    if(kind == Kind.STRING){
      return URLValidation(value);
    }
    return null;
  }
});

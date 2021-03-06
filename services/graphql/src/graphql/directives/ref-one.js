const { SchemaDirectiveVisitor } = require('graphql-tools');
const { get } = require('@base-cms/object-path');
const { account: connection } = require('../../mongoose/connections');

class RefOneDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    const {
      modelName,
      localField,
      foreignField,
    } = this.args;

    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, _, { load }) => {
      const Model = connection.model(modelName);
      const value = typeof doc.get === 'function' ? doc.get(localField) : get(doc, localField);
      if (!value) return null;
      if (foreignField === '_id') return load(modelName, value);

      const query = {
        [foreignField]: value,
        deleted: false,
      };
      return Model.findOne(query);
    };
  }
}

module.exports = RefOneDirective;

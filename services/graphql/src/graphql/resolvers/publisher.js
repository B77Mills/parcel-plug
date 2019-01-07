const Publisher = require('../../mongoose/models/publisher');

module.exports = {
  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createPublisher: (_, { input }, { auth }) => {
      const publisher = new Publisher(input);
      publisher.setUserContext(auth.user);
      return publisher.save();
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    publisher: (_, { input }) => {
      const { id, deleted } = input;
      return Publisher.findOne({ _id: id, deleted });
    },

    /**
     *
     */
    publishers: (_, { input }) => {
      const { deleted, sort, pagination } = input;
      const query = { deleted };
      return Publisher.paginate({ query, sort, ...pagination });
    },
  },
};

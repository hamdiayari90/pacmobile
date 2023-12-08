const config = {
  screens: {
    Acceuil: {
      initialRouteName: 'home',
      path: 'home',
    },
    AddReclamation: {
      path: 'AddReclamation',
    },

    FollowPhoto: {
      path: 'FollowPhoto/:id',
      parse: {
        id: id => `${id}`,
      },
    },
    SuivieLocalisation: {
      path: 'SuivieLocalisation/:id',
      parse: {
        id: id => `${id}`,
      },
    },
    ReplyImage: {
      path: 'ReplyImage/:id',
      parse: {
        id: id => `${id}`,
      },
    },
    LinkingId: {
      path: 'redirectFollow/:id',
      parse: {
        id: id => `${id}`,
      },
    },
    Follow: {
      path: 'follow/:id',
      parse: {
        id: id => `${id}`,
      },
    },
    CondidateDetail: {
      path: 'CondidateDetail/:id',
      parse: {
        id: id => `${id}`,
      },
    },
    BriefDetail: {
      path: 'BriefDetail/:id',
      parse: {
        id: id => `${id}`,
      },
    },
    DetailEvent: {
      path: 'DetailEvent/:id',
      parse: {
        id: id => `${id}`,
      },
    },
  },
};
//ReplyImage
const linking = {
  prefixes: ['tde://pac', 'http://pac-tde'],
  config,
};
export default linking;

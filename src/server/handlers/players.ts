export const getPlayers = ctx => {
  ctx.body = {
    meta: {},
    data: [
      {
        id: 1,
        firstName: 'Mike',
        lastName: 'Magoo',
        country: 'Netherlands',
        age: 25,
        value: 200000,
        teamName: 'Some team',
        status: 'active',
      },
      {
        id: 3,
        firstName: 'Jerry',
        lastName: 'Magoo',
        country: 'England',
        age: 28,
        value: 150000,
        teamName: 'Another team',
        status: 'active',
      },
    ],
  };
};

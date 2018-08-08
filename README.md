No DB specified so I opted for lowdb (flat-file) for set up simplicity (no docker stuff with mongo / postgres), but I have structured in a way where it can be easily replaced by any DB.
 
*Run the app*
- yarn install
- yarn db:init
- yarn dev

Once set up you can use the admin account using admin/admin or sign yourself up as a team owner. 

db.json will be created. If you edit this, restart the app manually.

*Notes*
I have opt for the owner to sell a player for any price. If a player is bought for that price, their value is updated.
I have split teams and users to not restrict the ability to switch teams, manage multiple teams etc.

*ToDos*
- ~~account log in~~
- ~~sign up~~
- ~~generated team + players~~
- ~~transfer own player~~
- ~~buy a player~~
- ~~edit profile~~
- ~~manager/admin create teams~~
- ~~manager/admin edit teams~~
- ~~filters name, country, team~~
- ~~dashboard, messages~~
- ~~logout~~
- ~~REST api / accesstoken~~
- ~~admin create player~~
- ~~admin delete~~
- ~~admin edit~~
- admin change roles

- bonus: refactoring
- bonus: ui / ux
- bonus: unit / e2e
Runs lowdb for setting up simplicity (no docker stuff with mongo / postgres), but structured in a way where it can be easily replaced by any DB.
 
*Run the app*
- yarn install
- yarn db:init
- yarn dev

Once set up you can use the admin account using admin/admin or sign yourself up as a team owner. 

db.json will be created. If you edit this, restart the app manually.

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
- admin edit
- admin change roles
- bonus: ui / ux
- bonus: unit / e2e
### Terminology

In our project, we have many models, and each models has many instances. We call these
instances "particles" and we call the pages that collect many instances in some kind of
list or grid "blobs".

So for example, Aatrox is an instance of the Champion model, so the Aatrox page is a 
champion particle page.

### Routing

To consolidate the project, I had to first get all of the components from 
our original projects in the top level react folder to one project. The next
problem was routing all of the components together.

The routing solution we used was that there is a top-level App react component 
that keeps track of the current state of the program. The state it keeps track
of is the whether a particle of one of the models is currently being inspected,
and what models are generally supposed to be displayed. This makes it so that
all of the routing logic and display logic all waterfalls down from one component
that keeps track of inherent state. The other benefit to this strategy is that 
it's easily extensible in the future. If you want a component to route to any 
other program state, you simple pass along the route function as a property and then
call it with the correct arguments.

The route function takes two arguments, the model and the particle name. If the particle
name exactly matches the string "none", the website shows a general purpose page, like any
of the pages in the navbar. If the particle name is not "none", it's name is expected 
to be an identifying name of one part of the current model. 

There are the following models, and only some of them have specific particles:

 - Home: no particles
 - Search: particles of all models, needs routing.
 
The following are particle models: 
 
 - ChampionList: champion particles, needs routing.
 - ChampionView: a single champion particle that routes to the attributes of the champion 

 - ItemList: item particles, needs routing.
 - ItemView: a single item particle that routes to the attributes of the item
 
 - ClassList: class particles, needs routing.
 - ClassView: a single class particle that routes to the attributes of the class
 
 - RoleList: role particles, needs routing.
 - RoleView: a single role particle that routes to the attributes of the role
 
 - About: no particles
 
Every single page has some basic routing with the navbar, so we send some basic routes 
through that that don't keep track of any specific particle. So when we route to the navbar,
we can partially apply it so that it only uses "none" for the particle type.

### Consolidation Benefits

There's a great deal of benefits that we received when consolidating the project. 
Since create-react-app had to build around ten individual project before and now it only has
to build one, the build times are an order of magnitude faster. It also means that there's
a great increase in the testability of the code because we can use create-react-app's 
"npm start" command and test the majority of the code for the website, with live updates
and refreshes. This tremendously increases developer productivity and it decreases the time
between a bug is made and the bug is found and squashed, even separate as a byproduct of the 
simplified testing. This also means that it's a lot simpler to get started helping the 
project grow in the future, and onboarding new members of the team should be rather simple in
comparison.

There's also the code itself, that is much more clean with the impressive scale of this 
refactor. Many of the benefits include reuse of react components, reuse of program logic, 
cleaner logic for program state, better analysis of program state during testing, and many 
more.

The reuse of react components was the principle thing on my mind during the consolidation.
Before, on every page, we had to have a separate navbar that was basically the same component
copy-pasted onto many different files. There were ten different copies of the navbar 
initially. After that, the number shrank. We also extended many of the view components to
be reused in both the list and the search results, so that much of the code to show each 
particle in a card from reactstrap was reduced.

The reuse of program logic was the fundamental thing that allowed us to actually consolidate
the project at all. The project needs to have a core component that analyzes state, so 
it removes all routing logic to a central location, all champion logic to the champion 
modules, all item logic to the item modules, all class logic to the class modules, and all 
role logic to the role modules. There's also a great deal of state that is abstracted away 
in the search module. 

The fact that our project is modular in the first place was necessary to make it possible
to add new features quickly. In effect, this made our code more agile.
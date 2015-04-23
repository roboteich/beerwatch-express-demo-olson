#Beer Watch Demo NodeJS API

# Summary
This project is a REST API built on NodeJS that utilizes Azure DocumentDB as a Data Store.  MVC was based on this tutorial:
http://azure.microsoft.com/en-us/documentation/articles/documentdb-nodejs-application/#_Toc395783178

## Prerequisites
* [Node.js](http://nodejs.org/) version v0.10.29 or higher.
* [Express generator](http://www.expressjs.com/starter/generator.html) (you can install this via npm install express-generator -g)
Git.

## Setup

1. Open your favorite terminal
1. Open the project root directory and install dependencies
```
cd <your project folder>
npm install
```
1. Run the application
```
npm start
```
1. You can now view the application by navigating to [http://localhost:3000](http://localhost:3000)

#Rest API Resources/Actions
##Beer

```
{
    id: auto generated - guid <br />
    name:string
    beerFamily:[string]
    description:string
    brewer: {
      name:string
      location_state:string
      location_city:string
      location_country:string
    }
    image_url:string
    hops:[string]
    yeast:[string]
    hopProfile:[string]
    abv:float 
    ibu:float
    srm:float
  }
 ```


### GET /api/beer 
* returns - all beers

### GET /api/beer/:beer_id
* returns - beer

### POST api/beer

* header: Content-Type=application/json
* post body - (beer with no id)
* returns - beer (with auto generated id)

### PUT api/beer/:beer_id

* header: Content-Type=application/json
* post body - (fields to change)
* returns - beer (updated)

## Pour
Collection : Activity

```
  {
     user_id:user uuid
    beer_id:beer uuid
   type:"pour"
   rating:int | null
   poured_on:[DateTime]
   date_created: DateTime
   last_updated:DateTime
  }
```

### GET /api/user/:user_id/pour

* returns - [pour] ordered by last update

### PUT /api/user/:user_id/pour/:beer_id

* header: Content-Type=application/json
* post body - {[rating:int|null], [poured_on:datetime]}
* returns - pour (updated)

## Suggestions
[beer]{5}

### GET /api/user/:user_id/suggestions

* params 
  * mode (optional) -  <default> | norm | adventure
* returns [beer]{5}

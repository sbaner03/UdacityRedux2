var sortBy = require('sort-by'),
    users = [];
users = [{id: "8xf0y6ziyjabvozdd253nd", timestamp: 1467166872634, voteScore: 6, body: "Everyone says so after all."},
        {id: "6ni6ok3ym7mf1p33lnez", timestamp: 1468479767190, voteScore: -5, body: "Just kidding. It takes more than 10 minutes to learn technology."}]


let a = users.sort(sortBy('timestamp'));

console.log(a)
/**
*   result:
*       [{id: 4, name: 'Bar', age: '67', email: { primary: 'bar@email.com' }},
*       {id: 3, name: 'Baz', age: '67', email: { primary: 'baz@email.com' }},
*       {id: 7, name: 'Foo', age: '34', email: { primary: 'foo@email.com' }}]
*/

/**
* Use `-` to reverse the sort order
*/

users.sort(sortBy('-id', 'name'));

/*
*   result:
*       [{id: 7, name: 'Foo', age: '34', email: { primary: 'foo@email.com' }},
*       {id: 4, name: 'Bar', age: '67', email: { primary: 'bar@email.com' }},
*       {id: 3, name: 'Baz', age: '67', email: { primary: 'baz@email.com' }}]
*/

/**
* Use `.` notation to traverse nested properties. See [object-path](https://www.npmjs.org/package/object-path) npm module for support.
*/

users.sort(sortBy('age', 'email.primary'));

/*
*   result:
*       [{id: 7, name: 'Foo', age: '34', email: { primary: 'foo@email.com' }},
*       {id: 4, name: 'Bar', age: '67', email: { primary: 'bar@email.com' }},
*       {id: 3, name: 'Baz', age: '67', email: { primary: 'baz@email.com' }}]
*/

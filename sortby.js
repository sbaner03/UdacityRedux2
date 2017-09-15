var sortBy = require('sort-by'),
    users = [];
users = [{id: "8xf0y6ziyjabvozdd253nd", timestamp: 1467166872634, voteScore: 6, body: "Everyone says so after all."},
        {id: "6ni6ok3ym7mf1p33lnez", timestamp: 1468479767190, voteScore: -5, body: "Just kidding. It takes more than 10 minutes to learn technology."}]


console.log(users.sort(sortBy('-voteScore')))

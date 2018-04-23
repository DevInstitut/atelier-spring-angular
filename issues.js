const {gh, githubUser, config} = require('./issues');

/**
 * Scripting
 *
 * Génération des issues.
 *
 */
const fs = require('fs');

const allCalls = [];

Object.keys(config).forEach(repo => {
    fs.readdirSync(`${config[repo]}/issues`).forEach(file => {
        const message = fs.readFileSync(`${config[repo]}/issues/${file}`, 'utf8');

        const title = file.replace('.md','');

        allCalls.push(gh.getIssues(githubUser, `${repo}-front`).createIssue({
            title : title,
            body: message
        }));
    })
});

Promise.all(allCalls).catch(console.log);
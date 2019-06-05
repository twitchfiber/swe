var fs = require('fs');
var router = {
            getIssuesbyID:function (id) { 
                //Returns issues tied to a User ID 
                const dataBuffer = fs.readFileSync("issuedb.json")
				const dataJSON = dataBuffer.toString()
				const issues = JSON.parse(dataJSON)
                retIssues = {}
				issues.forEach((issue) => {
				if (issue.id === id) {
                        retIssues = issue
					}
				})
                return retIssues; 
			},
            getIssuesbyUser:function (user) { 
                //Returns issues tied to a User ID 
                const dataBuffer = fs.readFileSync("issuedb.json")
				const dataJSON = dataBuffer.toString()
				const issues = JSON.parse(dataJSON)
                retIssues = {}
				issues.forEach((issue) => {
				if (issue.submitter === user) {
                        if (retIssues = {}){
                            retIssues = issue
                            }
                        else {
                            retIssues.push(issue)
                        }
					}
				})
                return retIssues; 
			},
            getIssueswFilter:function (user,filter) { 
                //Returns issues that satisfy the parameters set in filter
            },
            addIssue:function (user,issue) { 
                //Create new Issue Ticket with issue data
                issue= {location: issue.location, type: issue.type, severity: issue.severity, submitter: user, id: Math.round(Math.random()*1000000)}
				const dataBuffer = fs.readFileSync("issuedb.json")
				const dataJSON = dataBuffer.toString()
				let currIssues = JSON.parse(dataJSON)
				currIssues.push(issue)
				// save users
				fs.writeFileSync('issuedb.json', JSON.stringify(currIssues))
            },
			updateIssue:function (user,issue) { 
                //Update Issue ticket with new data
            },
			resolveIssue:function (user,issue) { 
                //Resolve Issue ticket
            }
    };

module.exports = router
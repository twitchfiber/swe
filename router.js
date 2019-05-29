var router = {
            getIssuesbyID:function (userID) { 
                //Returns issues tied to a User ID 
			},
            getIssueswFilter:function (userID,filter) { 
                //Returns issues that satisfy the parameters set in filter
            },
            addIssue:function (userID,issue) { 
                //Create new Issue Ticket with issue data
            },
			updateIssue:function (userID,issue) { 
                //Update Issue ticket with new data
            },
			resolveIssue:function (userID,issue) { 
                //Resolve Issue ticket
            }
    };

module.exports = router
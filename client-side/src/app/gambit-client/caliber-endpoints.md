# End Points

## Admin
### Buckets
  ####GET /buckets
    gets all the buckets.
  ####GET /buckets/{bucketId}
    gets a bucket.
  
   ####PUT /buckets
    update the bucket.
   
   ####POST /buckets
     create a new bucket.
     
   ####DELETE /buckets/{bucketId}
    delete bucket by id

### Categories
  ####GET /categories
    gets all the categories.
    
  ####GET /categories/active
    gets all active categories.
  
   ####GET /categories/{categoryId}
    get the specific category.
  
   ####PUT /categories/{categoryId}
    update specific category.
   
   ####POST /category
    create a new category.
     
   ####DELETE /category/{categoryId}
    delete category by id
  
### Questions
  ####GET /questions/bucket/{bucketId}
    gets all the questions by bucket id.
    
  ####POST /questions
    add new question.
  
   ####PUT /questions/{questionId}
    updates the specific question
  
   ####PUT /questions/{questionId}/deactivate
    deactiave the question.
   
   ####PUT /questions/{questionId}/activate
    activate the question
     
   ####DELETE /questions/{questionId}
    delete question by id
  
  
### SkillType
  ####GET /skillTypes
    find all skill types.
    
  ####GET /skillTypes/active
    find all active skill types.
    
  ####GET /skillTypes/{skillTypeId}
    find skill types by id.
    
  ####GET /skillTypes/{skillTypeName}
    find skill types by name.
    
  ####POST /skillTypes
    save skill type
  
   ####PUT /skillTypes/{skillTypeId}
    updates specific skill type
     
   ####DELETE /skillTypes/{skillTypeId}
    delete skill type by id

### Screening

  #### GET /screening/violation/{screeningID}
    Returns a list of softSkillViolation objects by ScreeningID

  #### GET /violation/all
    Returns a list of all ViolationType

  #### GET /violation/delete/{softSkillViolationID}
    Deletes a soft skill violation by its unique id

  #### POST screening/introcomment
    Update the AboutMeComment variable of a Screening object

  #### POST /violation/flag
    Create a SoftSkillViolation for each ViolationID in the RequestBody, and associates it with the given Screening

  #### POST /screening/start
    Starts a screening by putting the screening into the database and returning the screeningId

  #### POST /screening/generalcomment
    Persists general comment to a Screening by its unique id

  #### POST /screening/end
    End a Screening and update the information by screeningId

  #### GET /screening/getScreening/status/{status}
    Get screenings based on the status provided

  #### GET /screening/scheduledScreenings
    Gets all scheduled screeenings

### Question Score

  #### POST /question/score
    Create a new Question Score and persist it in the database.

  #### GET question/viewScoresByScreening/{screeningId}
    Gets scores of given screening by id
